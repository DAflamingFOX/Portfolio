'use client';

import { Divider } from "@heroui/react";
import { Link } from "@heroui/react";

export default function ArticleFooter({ }) {
    return (
        <>
            <Divider className="my-4" />
            <p className="text-secondary-600" >Finished here? See the <Link href='/blog/'>latest posts</Link> or head <Link href='/'>home.</Link></p>
            <p className="text-secondary-600">Questions, comments, or concerns? <Link href='/contact_me/'>Contact me.</Link></p>
        </>
    )
}