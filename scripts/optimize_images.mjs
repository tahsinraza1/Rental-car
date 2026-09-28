import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const assetsDir = path.join(rootDir, 'src', 'assets')

async function optimizeFolder(dir, maxWidth, quality, extPattern = /\.(jpe?g|png)$/i) {
  if (!fs.existsSync(dir)) return
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      continue
    }
    if (extPattern.test(file)) {
      const baseName = file.replace(extPattern, '')
      const outPath = path.join(dir, `${baseName}.webp`)
      
      const beforeSize = stat.size
      await sharp(fullPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality, effort: 6 })
        .toFile(outPath)
      
      const afterSize = fs.statSync(outPath).size
      const savings = ((beforeSize - afterSize) / beforeSize * 100).toFixed(1)
      console.log(`✓ ${file} -> ${baseName}.webp: ${(beforeSize/1024).toFixed(0)}KB -> ${(afterSize/1024).toFixed(0)}KB (-${savings}%)`)
    }
  }
}

async function run() {
  console.log('🚀 Starting Comprehensive Image Optimization with Sharp...\n')

  // 1. Owners
  console.log('--- Owners Photos (Max 600px, Q=82) ---')
  await optimizeFolder(path.join(assetsDir, 'owners'), 600, 82)

  // 2. Occasions
  console.log('\n--- Occasions Photos (Max 800px, Q=82) ---')
  await optimizeFolder(path.join(assetsDir, 'occasions'), 800, 82)

  // 3. Steps
  console.log('\n--- Steps Photos (Max 800px, Q=82) ---')
  await optimizeFolder(path.join(assetsDir, 'steps'), 800, 82)

  // 4. Cars
  console.log('\n--- Cars Photos (Max 800px, Q=82) ---')
  await optimizeFolder(path.join(assetsDir, 'cars'), 800, 82)

  // 5. Root Assets (Hero, Backgrounds)
  console.log('\n--- Hero & Background Assets (Max 1600px, Q=84) ---')
  await optimizeFolder(assetsDir, 1600, 84)

  console.log('\n✨ All image optimizations complete!')
}

run().catch(console.error)
