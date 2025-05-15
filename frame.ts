import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchParams } = new URL(req.url || '', `http://${req.headers.host}`);
  const choice = searchParams.get("choice");

  const result = Math.random() < 0.5 ? "heads" : "tails";
  const win = choice === result;

  const imageUrl = win
    ? "https://example.com/win.png"
    : "https://example.com/lose.png";

  const html = getFrameHtmlResponse({
    buttons: [
      { label: "Play Again", action: "link", target: "https://your-app.vercel.app" },
    ],
    image: imageUrl,
    post_url: "https://your-app.vercel.app/api/frame",
  });

  return res.status(200).send(html);
};

export default handler;