---
    title: "MOSFET Process Characterization Guide"
    date: "2-22-26"
    excerpt: "Extracting simple MOSFET model variables from a complex model file."
    tags: ["Electrical Engineering"]
    isPublished: true
---

*Reference code for this blog is available [here.](https://github.com/daflamingfox/mosfet-process-characterization)*

# Introduction

Often times when working with MOSFETs you may want to work a problem out by hand. You may do this for any number of reasons, but one may be just to do some quick calculations by hand as opposed to setting up a full simulation. This way, you can do the math symbolically and compute any parameters you may be looking for.

However, we may only have the simulation model, and the equations for using these models get increadibly complicated very quickly.

Thankfully, we can use "process characterization" which allows us to model the MOSFET using two relatively simple equations (NMOS shown, PMOS similar):

$$
\begin{align*}
I_{D} & = \frac{1}{2} \cdot k' \left(\frac{w}{l}\right) \left( V_{GS} - V_{T} \right)^2 \left( 1 + \lambda V_{DS} \right)\\
V_{T} & = V_{T0} + \gamma \left[ \sqrt{2\phi_{F} + V_{SB}} - \sqrt{2\phi_{F}} \right]
\end{align*}
$$

The first equation is the MOSFET drain current equation, and the second equation is the body-effect equation. Using these equations we can determine just a few parameters that model the MOSFET fairly well: $k'$, $V_{T0}$, $2\phi_{F}$, $\gamma$, and $\lambda$. Note that these equations are for NMOS devices, PMOS devices are similar, see my note in the conclusion for more info.

For this demo, I'll be using LTSpice and [this](/blog/files/process_characterization/mosfet_model.txt) advanced MOSFET model. As you can see from the model file, it is much more complicated than the above equations and parameters.

## Finding $k'$ and $V_{T0}$

To get started, we will first be finding the $k'$ and $V_{T0}$ values.

To get started, we're going to bias up our MOSFET by sending a bias current, $I_{bias}$ through it. We have the MOSFET in a diode-connected orientation, this means the gate and drain are tied together and at the same potential. We also have a current source $V_{SB}$ which will be used to invoke the body-effect by causing the source and body to be at different potentials.

Here is the LTSpice schematic:

![nmos_spice](/blog/process-characterization/nmos_spice.png)

For now, we are only interested in the dc sweep of $I_{bias}$ where $V_{SB} = 0\mathrm{V}$.

Note that our $l$ value is relatively large for this process, this is ideal to minimize the effects of $\lambda$. This is also a good time to mention that all of these values may vary depending on the process you are trying to characterize, you should use appropriate bias points, and MOSFET geometries for *your* process.

Since we're minimizing the channel length modulation, $\lambda$, we will remove it from the drain current equation. Additionally, since we're using the step where $V_{SB} = 0\mathrm{V}$, we can say that $V_{T} = V_{T0}$ and thus we get the simplified drain current equation:

$$
    I_{D} = \frac{1}{2} \cdot k' \left( \frac{w}{l}\right) \left( V_{GS} - V_{T0} \right)^{2}
$$

We can then rearrange this equation as such:

$$
\begin{align*}
    \sqrt{I_{D}} & = \left(\frac{k' \cdot w}{2 l}\right)^{\frac{1}{2}} \left( V_{GS} - V_{T0} \right) \\
    V_{GS} & = \left(\frac{k' \cdot w}{2 l}\right)^{-\frac{1}{2}} \cdot \sqrt{I_{D}} + V_{T0} \\
\end{align*}
$$

If you look closely at the final line, you can see it is in the form of $y=mx+b$ where both $m$ and $b$ contain the parameters we wish to extract from the model, and $x$ and $y$ are values we can plot in LTSpice.

Finally we can extract $k'$ and $V_{T0}$:

$$
\begin{align*}
    m & = \left(\frac{k' \cdot w}{2 l}\right)^{-\frac{1}{2}} \\
    m^{2} & = \frac{2 l}{k' \cdot w} \\
    k' & = \frac{2 l}{m^{2} \cdot w} & V_{T0} & = b
\end{align*}
$$

In order to analyze our LTSpice data, we will first run the simulation, then we will plot the `V(Vgs)` node, then finally we will need to export it as a text file, here I've saved it as `nmos_single_data.txt`:

![nmos_spice_run_and_save_gif](/blog/process-characterization/nmos_spice_run_and_save.gif)

Next, we need to perform a linear fit on the data, to do so, we're going to use python as it's pretty easy to work with. We use the numpy polyfit method to fit the data. below is a quick snippet showing a simple example of how to do this:

```python
# MOSFET length and width.
L = 2e-6
W = 10e-6

# Make sure we're fitting over the sqrt of the drain current.
sqrt_i_d = np.sqrt(i_d)

# Perform the linear fit.
m, b = np.polyfit(sqrt_i_d, v_gs, deg=1)

# Extract the process variables.
k_prime = (2 * L) / (W * (m**2))
v_t0 = b # This is only Vt0 if the source-body voltage is 0V!
```

## Finding $2\phi_{F}$

Let's recall the threshold voltage equation from above:

$$
\begin{align*}
    V_{T} & = V_{T0} + \gamma \left[ \sqrt{2\phi_{F} + V_{SB}} - \sqrt{2\phi_{F}} \right]
\end{align*}
$$

First, in order to estimate $2\phi_{F}$, we need to eliminate $\gamma$ from the equation.
To do this, we'll define $\alpha_{n}$ (where $n$ refers to a different $V_{sb}$ step) such that:

$$
\begin{align*}
    \alpha_{n} & = V_{Tn} - V_{T0}
\end{align*}
$$

As before when we found $V_{T0}$, we can do the same thing, except we will use different $V_{sb}$ values, where $V_{sb} \ne 0\mathrm{V}$.
From the same LTSpice schematic above, you can see that I used $V_{sb}$ values of $0.25\mathrm{V}$, $0.5\mathrm{V}$, and $0.75\mathrm{V}$, (along with our $V_{T0}$ step, where $V_{sb} = 0\mathrm{V}$).

After we calculate these $\alpha_{n}$ values, we can eliminate $\gamma$ by creating two ratios:

$$
\begin{gather*}
\frac{\alpha_2}{\alpha_1} = \frac{\gamma \left[ \sqrt{2\phi_{F} + V_{SB2}} - \sqrt{2\phi_{F}} \right]}{\gamma \left[ \sqrt{2\phi_{F} + V_{SB1}} - \sqrt{2\phi_{F}} \right]} \quad \text{and} \quad \frac{\alpha_3}{\alpha_2} = \frac{\gamma \left[ \sqrt{2\phi_{F} + V_{SB3}} - \sqrt{2\phi_{F}} \right]}{\gamma \left[ \sqrt{2\phi_{F} + V_{SB2}} - \sqrt{2\phi_{F}} \right]}
\end{gather*}
$$

As you can see, the $\gamma$ value will cancel out in each ratio, leaving us with only the unknown $2\phi_{F}$ value. In order to extract the $2\phi_{F}$ value, we will sweep through a range of values in order to find the $2\phi_{F}$ value which most accurately represents the "observed" $\alpha$ ratio value. So to be more precise, we will minimize the 2-norm error, $\sqrt{\left.e_{1}\right.^{2} + \left.e_{2}\right.^{2}}$, defined by the following:

$$
\begin{gather*}
    e_{1} = \frac{\left[ \sqrt{2\phi_{F} + V_{SB2}} - \sqrt{2\phi_{F}} \right]}{\left[ \sqrt{2\phi_{F} + V_{SB1}} - \sqrt{2\phi_{F}} \right]} - \frac{\alpha_2}{\alpha_1} \quad \text{and} \quad e_{2} = \frac{\left[ \sqrt{2\phi_{F} + V_{SB3}} - \sqrt{2\phi_{F}} \right]}{\left[ \sqrt{2\phi_{F} + V_{SB2}} - \sqrt{2\phi_{F}} \right]} - \frac{\alpha_3}{\alpha_2}
\end{gather*}
$$

Let's see what this looks like in python:
```python
# Calculate our alpha values.
a1 = v_t_vals[1] - v_t_vals[0]
a2 = v_t_vals[2] - v_t_vals[0]
a3 = v_t_vals[3] - v_t_vals[0]

# Lambda function which returns the portion of the
# body-effect equation which is multiplied by gamma.
# sqrt( 2phi_f + Vsb ) - sqrt( 2phi_f )
gamma_term = lambda tpf, vb: np.sqrt(tpf + vb) - np.sqrt(tpf)

# Lambda functions which calculate the e1 and e2 errors for a given 2phi_f value.
e1 = lambda tpf: (
    gamma_term(tpf, v_b_vals[2]) / gamma_term(tpf, v_b_vals[1])
) - (a2 / a1)
e2 = lambda tpf: (
    gamma_term(tpf, v_b_vals[3]) / gamma_term(tpf, v_b_vals[2])
) - (a3 / a2)

# Lambda function to calculate the two-norm error.
twonorm = lambda e1, e2: np.sqrt(e1**2 + e2**2)

# Create a sweep of 2phi_f values within a reasonable range.
tpf_vals = np.linspace(0.3, 1.3, 10_000)
# Calculate the two-norm residual value for each 2phi_f estimate.
residuals = np.array([twonorm(e1(tpf), e2(tpf)) for tpf in tpf_vals])

# Get the index of the lowest two-norm error.
best_index = np.argmin(residuals)
# Extract 2phi_f to be the best estimate
two_phi_f = tpf_vals[best_index]
```

## Finding $\gamma$

Now that we have a value for $2\phi_{F}$, we can take another look at the threshold voltage equation:

$$
\begin{align*}
    V_{T} & = V_{T0} + \gamma \left[ \sqrt{2\phi_{F} + V_{SB}} - \sqrt{2\phi_{F}} \right]
\end{align*}
$$

Once again, we see it's in the form of a linear function, where $V_{T}$ is the $y$ value, $\left[ \sqrt{2\phi_{F} + V_{SB}} - \sqrt{2\phi_{F}} \right]$ is the $x$ value. From this, we can extract $\gamma$ which is the slope, $m$, of this linear fit.

Just like before, we can use numpy to extract this value:

```python
# Setup the x and y values for the linear fit.
# Note: we're using some variables and lambda functions from the 2phi_f step.
x_vals = np.array([gamma_term(two_phi_f, vb) for vb in v_b_vals])
y_vals = v_t_vals - v_t_vals[0]

# We only need the m value since we moved the intercept over. y-b = mx
m = np.polyfit(x_vals, y_vals, deg=1)
# Extract our estimated gamma value.
gamma = m
```

## Finding $\lambda$

Finally, all we have left to estimate is the $\lambda$ value.
This value represents the channel length modulation, and as such is dependent on the device geometry.
Because of this, we must calculate the $\lambda$ for each channel length we may be interested in, so we'll calculate a few values.

Let's recall the full drain current equation:

$$
\begin{gather*}
    I_{D} = \frac{1}{2} \cdot k' \left(\frac{w}{l}\right) \left( V_{GS} - V_{T} \right)^2 \left( 1 + \lambda \cdot V_{DS} \right)
\end{gather*}
$$

As you can see, $\lambda$ affects the drain current proportional to the drain-source voltage. This means we can simplify the drain current equation as such:

$$
\begin{gather*}
    I_{D} = I_{D0} \cdot \lambda \cdot V_{DS} + I_{D0}
\end{gather*}
$$

Where $I_{D0}$ is the drain current without the $(1+\lambda \cdot V_{DS})$ term.
Once again, we see this is in the form of a line, where the $I_{D}$ is $y$, $V_{DS}$ is $x$, $I_{D0} \cdot \lambda$ is $m$, and $I_{D0}$ is $b$.

To set this up in LTSpice, we will use a simple current mirror, this let's us have two identical and matched MOSFETs which helps to cancel out any other process variations. We pass a bias current though the diode connected MOSFET which will bias up the second MOSFET, eliminating the other process characteristics. We can then vary the $V_{DS}$ of the second MOSFET to see how $\lambda$ affects it. Below is an image of the LTSpice schematic:

![nmos_mirror_spice](/blog/process-characterization/nmos_mirror_spice.png)

Let's briefly take a glance at what the plot looks like first to see what we're getting into:

![nmos_mirror_plot](/blog/process-characterization/nmos_mirror_plot.png)

As you can see on the far left, the MOSFET is in the triode / linear region, this is not what we're looking for and there are different equations that model the MOSFET during this region.
Secondly, on the far right you can see how the slope on some graphs continue to rise the higher $V_{DS}$ gets, this is a phenomenon known as punch-through and again is a non-ideality we don't want to capture in our estimation.

In order to mitigate this and extract the best estimate we can, we want to take a relatively small slice of the plot, say $200\,\mathrm{mV}$, shortly after the MOSFET is saturated.

Once again, we can use python and numpy to do just that:
```python
# Start linear fit at 700mV.
v_start = 0.7
# Use a 200mV slice.
v_range = 0.2
# Get the end of the slice.
v_end = v_start + v_range

# Array to store the lambda estimate for each channel length.
lambda_vals = []

# Iterate over each plot from LTSpice, one for each channel length.
for sweep in sweeps:
    # Create a mask to filter only the slice we're interested in.
    mask = (sweep.v_ds >= v_start) & (sweep.v_ds <= v_end)

    m, b = np.polyfit(sweep.v_ds[mask], sweep.i_d[mask], deg=1)

    # Since m = Id0 * lambda, and b = Id0
    # We can isolate lambda by doing m / b
    lambda_vals.append(m / b)
```

## Conclusion

Finally! We have now fully process characterized the MOSFET model, and can use it however we please.

A quick note on PMOS devices:

All the voltages measured on a PMOS device must be inverted from the standard NMOS definition.
For instance, $V_{GS}$ on an NMOS should be $V_{SG}$ on a PMOS device.
If you take care to properly do all of the inversions, the same code which will characterize an NMOS will also characterize a PMOS.
All values should be positive, except for $V_{T0p}$.

For reference, here are the values I extracted from the [demo model](/blog/files/process_characterization/mosfet_model.txt):

**NMOS**
| Parameter | Value |
|---|---|
| $k_{n}'$ | $107.597\, \mathrm{\mu A/V^{2}}$ |
| $V_{T0n}$ | $983.901\, \mathrm{mV}$ |
| $2\phi_{Fn}$ | $914.761\, \mathrm{mV}$ |
| $\gamma_{n}$ | $1.104\, \mathrm{V^{1/2}}$ |
| $\lambda_{n} \quad (l_{n}=0.3\,\mathrm{\mu m})$ | $1.764\,\mathrm{V^{-1}}$ |
| $\lambda_{n} \quad (l_{n}=0.5\,\mathrm{\mu m})$ | $101.117\,\mathrm{mV^{-1}}$ |
| $\lambda_{n} \quad (l_{n}=1\,\mathrm{\mu m})$ | $30.712\,\mathrm{mV^{-1}}$ |
| $\lambda_{n} \quad (l_{n}=1.5\,\mathrm{\mu m})$ | $31.347\,\mathrm{mV^{-1}}$ |
| $\lambda_{n} \quad (l_{n}=2\,\mathrm{\mu m})$ | $29.954\,\mathrm{mV^{-1}}$ |

**PMOS**
| Parameter | Value |
|---|---|
| $k_{p}'$ | $33.105\, \mathrm{\mu A/V^{2}}$ |
| $V_{T0p}$ | $-1.034\, \mathrm{mV}$ |
| $2\phi_{Fp}$ | $812.051\, \mathrm{mV}$ |
| $\gamma_{p}$ | $717.739\, \mathrm{mV^{1/2}}$ |
| $\lambda_{p} \quad (l_{p}=0.3\,\mathrm{\mu m})$ | $524.024\,\mathrm{mV^{-1}}$ |
| $\lambda_{p} \quad (l_{p}=0.5\,\mathrm{\mu m})$ | $214.888\,\mathrm{mV^{-1}}$ |
| $\lambda_{p} \quad (l_{p}=1\,\mathrm{\mu m})$ | $97.495\,\mathrm{mV^{-1}}$ |
| $\lambda_{p} \quad (l_{p}=1.5\,\mathrm{\mu m})$ | $71.261\,\mathrm{mV^{-1}}$ |
| $\lambda_{p} \quad (l_{p}=2\,\mathrm{\mu m})$ | $60.357\,\mathrm{mV^{-1}}$ |

