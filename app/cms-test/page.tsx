import { getBusinessLines } from "@/lib/cms/business-lines";

export default async function CmsTest() {
    const items = await getBusinessLines();
    return (
        <pre>
            {JSON.stringify(
                items.map((i) => ({ slug: i.slug, name: i.name, order: i.order })),
                null,
                2
            )}
        </pre>
    );
}