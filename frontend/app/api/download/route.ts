export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const url = searchParams.get("url");

  if (!url) return new Response("Missing URL", { status: 400 });

  const token = "PTgRYpG70EvdEXjEN62OB1O80bS4kaTKZDzHRc1O";

  const formData = new FormData();
  formData.append("_token", token);

  console.log(url)

  const res = await fetch(url, {
    method: "POST",
    body: formData,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment;"`,
      "Content-Length": res.headers.get("Content-Length"),
    },
  });
}
