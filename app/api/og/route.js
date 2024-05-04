import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hasTitle = searchParams.has("title");

  const title = hasTitle ? searchParams.get("title") : "Khana Khazana website";

  return new ImageResponse(
    (
      <div tw='text-7xl bg-teal-600 w-full h-full flex text-center items-center justify-center'>
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
