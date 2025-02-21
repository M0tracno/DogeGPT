import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const generateMemeImage = async (prompt: string): Promise<string> => {
  const image = await replicate.run(
    "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf",
    {
      input: {
        prompt: `meme style: ${prompt}`,
        negative_prompt: "nsfw, offensive content",
        num_outputs: 1,
      },
    }
  );

  if (!Array.isArray(image) || image.length === 0) {
    throw new Error("Failed to generate meme image.");
  }

  return image[0] as string;
};
