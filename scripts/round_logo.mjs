import sharp from 'sharp';

async function main() {
  const metadata = await sharp('src/assets/logo.png').metadata();
  const width = metadata.width;
  const height = metadata.height;
  const radius = Math.round(height * 0.22); // smooth rounded radius

  const roundedCorners = Buffer.from(
    `<svg width="${width}" height="${height}"><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`
  );

  await sharp('src/assets/logo.png')
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .webp({ quality: 92 })
    .toFile('src/assets/logo.webp');

  console.log('Successfully updated src/assets/logo.webp with smooth rounded corners!');
}

main().catch(console.error);
