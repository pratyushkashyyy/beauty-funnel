const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const image = sharp(inputPath);
    
    // Get image metadata
    const metadata = await image.metadata();
    
    // Determine output format and quality
    const format = options.format || 'webp';
    const quality = options.quality || 80;
    
    // Resize if needed
    if (options.width || options.height) {
      image.resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Apply optimization based on format
    if (format === 'webp') {
      await image.webp({ quality }).toFile(outputPath);
    } else if (format === 'jpeg') {
      await image.jpeg({ quality }).toFile(outputPath);
    } else if (format === 'png') {
      await image.png({ quality }).toFile(outputPath);
    }
    
    // Get file sizes
    const originalSize = (await fs.stat(inputPath)).size;
    const optimizedSize = (await fs.stat(outputPath)).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
    return { originalSize, optimizedSize, savings };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    
    // Get all image files
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp)$/i.test(file) && 
      !file.includes('optimized')
    );
    
    console.log(`🎯 Found ${imageFiles.length} images to optimize...\n`);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      const result = await optimizeImage(inputPath, outputPath, {
        format: 'webp',
        quality: 80,
        width: 800, // Max width
        height: 600  // Max height
      });
      
      if (result) {
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
      }
    }
    
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log(`\n📊 Summary:`);
    console.log(`Original size: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
    console.log(`Optimized size: ${(totalOptimizedSize / 1024).toFixed(1)}KB`);
    console.log(`Total savings: ${totalSavings}%`);
    console.log(`\n✨ Optimization complete! Optimized images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

// Run optimization
optimizeAllImages(); 