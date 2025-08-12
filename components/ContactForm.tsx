'use client';

import React from "react";
import { Form, Input, Textarea, Button } from "@heroui/react";

interface ContactFormProps {
    className?: string
}

export function ContactForm({
    className = ''
}: ContactFormProps) {
    const [result, setResult] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        setIsProcessing(true);

        const formData = new FormData(form);
        formData.append("access_key", "7d64eb7a-5b25-453a-ac52-1d330567a1b8");

        try {

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult('success')
                form.reset()
            } else {
                console.log("Error", data);
            }
        } catch (error) {
            console.error(error);
            setResult('error');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Form
            className={`w-full max-w-md min-w-2xs flex flex-col gap-4 font-medium ${className}`}
            onReset={() => { setResult(''); }}
            onSubmit={onSubmit}
        >
            <Input
                isRequired
                isDisabled={isProcessing}
                errorMessage="Please enter a valid name"
                label="Name"
                name="name"
                placeholder="Enter your name"
                type="text"
            />

            <Input
                isRequired
                isDisabled={isProcessing}
                errorMessage="Please enter a valid email"
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
            />

            <Textarea
                isRequired
                isDisabled={isProcessing}
                errorMessage="Please enter a message"
                label="Message"
                name="message"
                placeholder="Enter your message"
                type="text"
            />
            <div className="flex gap-2">
                <Button color={result === 'error' ? 'danger' : (result === 'success' ? 'success' : 'primary')} type="submit" isLoading={isProcessing}>
                    Submit
                </Button>
                <Button type="reset" variant="flat" isDisabled={isProcessing}>
                    Reset
                </Button>
            </div>
        </Form>
    );
}

