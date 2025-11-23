import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const dirs = [
  'public/images/dateSyrup',
  'public/images/honey',
  'public/images/dates',
  'public/images/nuts',
  'public/images/spices',
  'public/images/juices'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Image URLs to download
const imagesToDownload = {
  dateSyrup: [
    { url: 'https://m.media-amazon.com/images/I/61ffx27qVeL._AC_UF894,1000_QL80_.jpg', filename: 'zazio_500g.jpg' },
    { url: 'https://m.media-amazon.com/images/I/713rSxKKaPL.jpg', filename: 'all_natural_400g.jpg' }
  ],
  honey: [
    { url: 'https://m.media-amazon.com/images/I/71tnN9QKWhL._AC_UF1000,1000_QL80_.jpg', filename: 'apis_himalaya_500g.jpg' },
    { url: 'https://5.imimg.com/data5/ANDROID/Default/2024/8/439525223/WV/UP/QR/145691869/product-jpeg-500x500.jpg', filename: 'wayanad_premium_500g.jpg' },
    { url: 'https://s3-us-west-2.amazonaws.com/clipthedeal/shop_products/1727179319.png', filename: 'rosh_honey_500g.png' },
    { url: 'https://m.media-amazon.com/images/I/51HNdejPRpL._AC_UF894,1000_QL80_.jpg', filename: 'apis_himalaya_225g.jpg' },
    { url: 'https://mybgood.com/cdn/shop/products/120Bgoodhoney_8313669b-b326-4677-b3df-c5dec3057015_500x.png?v=1650549665', filename: 'bgood_western_ghats_120g.png' }
  ],
  dates: [
    { url: 'https://nottynuts.in/cdn/shop/products/ajwa-date-6_2000x.jpg?v=1678541620', filename: 'ajwa_premium.jpg' },
    { url: 'https://bateel.com/blog/wp-content/uploads/2020/04/ajwa.jpg', filename: 'ajwa_psel.jpg' },
    { url: 'https://kroydeals.com/wp-content/uploads/2021/05/38d744_625bafb861354137b9a00e70c2d66680_mv2.png', filename: 'ajwa_medium.png' },
    { url: 'https://m.media-amazon.com/images/I/71tNHhFQJaL._AC_SX679_.jpg', filename: 'premium_mejdool_jordan_jumbo.jpg' },
    { url: 'https://m.media-amazon.com/images/I/71hzHq84rFL._SL1500_.jpg', filename: 'mejdool_jordan.jpg' },
    { url: 'https://www.grownmedz.co.za/wp-content/uploads/2021/09/medjool-jordan-dates-meduim-size.jpg', filename: 'jordan_medium.jpg' },
    { url: 'https://m.media-amazon.com/images/I/61HSetLOtEL._SL1200_.jpg', filename: 'premium_mabroom_jumbo.jpg' },
    { url: 'http://tamooriya.com/cdn/shop/files/Sagai-08.jpg?v=1712026455', filename: 'premium_sagai.jpg' },
    { url: 'https://tiimg.tistatic.com/fp/1/008/110/a-grade-nutrient-enriched-healthy-100-pure-natural-frozen-safawi-vip-dates-031.jpg', filename: 'safawi.jpg' },
    { url: 'https://fresh-city.co/wp-content/uploads/2020/07/Mazafati-Dates-1.jpg', filename: 'fazel.jpg' },
    { url: 'https://5.imimg.com/data5/ANDROID/Default/2022/3/WE/VC/CE/96460154/product-jpeg-1000x1000.jpg', filename: 'iran_dates.jpg' }
  ],
  spices: [
    { url: 'https://www.dorri.co.uk/wp-content/uploads/2021/01/untitled-session122753_1.jpg', filename: 'cinnamon_stick.jpg' },
    { url: 'http://www.monadnockoilandvinegar.com/uploads/2/6/0/7/26071578/s622544055737476414_p614_i1_w400.jpeg', filename: 'cinnamon_roll.jpeg' },
    { url: 'https://tse3.mm.bing.net/th/id/OIP.JIoks4QvifVG-WcYZl_PMwAAAA?pid=Api&P=0&h=180', filename: 'biriyani_leaf.jpg' },
    { url: 'https://www.nutsandfruits.in/wp-content/uploads/2021/10/grambu-clove-500x500-1.jpg', filename: 'grampu.jpg' },
    { url: 'https://shreejifoods.in/cdn/shop/products/dagad-phul.png?v=1616404405', filename: 'kalpasi.png' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2021/10/UM/PL/UU/139299043/star-anise-thakkolam--500x500.jpg', filename: 'thakkolam.jpg' },
    { url: 'https://truelyf.com/wp-content/uploads/2020/08/59-Mace-spice-Raw.jpg', filename: 'jathi_pathri.jpg' },
    { url: 'https://www.localefoods.com.au/assets/full/SPI001.jpg?20200709030722', filename: 'black_pepper.jpg' }
  ],
  juices: [
    { url: 'https://images.apollo247.in/pub/media/catalog/product/m/o/mog0026-2.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w', filename: 'mogu_mogu_melon.jpg' },
    { url: 'https://cdn.grofers.com/da/cms-assets/cms/product/87d776f4-438b-48c2-b4db-98087d8c0236.jpg', filename: 'mogu_mogu_orange.jpg' },
    { url: 'https://www.healthfoods4us.com/brands/mogumogu/products/mogu_apple.png', filename: 'mogu_mogu_apple.png' },
    { url: 'https://www.bbassets.com/media/uploads/p/l/100334329_7-mogu-mogu-juice-grape.jpg', filename: 'mogu_mogu_grapes.jpg' },
    { url: 'https://www.bbassets.com/media/uploads/p/l/100334326_6-mogu-mogu-juice-strawberry.jpg', filename: 'mogu_mogu_strawberry.jpg' },
    { url: 'https://cms.fresa.com.tr/tr.com.fresher.v1/products-fresher-250-lemon-01.png', filename: 'fresa_fresher_lemon.png' },
    { url: 'https://cms.fresa.com.tr/tr.com.fresher.v1/products-fresher-250-watermelon-strawberry-01.png', filename: 'fresa_fresher_watermelon_strawberry.png' },
    { url: 'https://m.media-amazon.com/images/I/81SZFaJ1dNL._AC_UF894,1000_QL80_.jpg', filename: 'cola_dates_extract.jpg' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2024/7/437689080/UJ/EQ/MV/99399999/rani-fruit-drink-peach-flavor-240-ml.png', filename: 'rani_float_peach.png' },
    { url: 'https://m.media-amazon.com/images/I/51bWRooFocL._AC_UF894,1000_QL80_.jpg', filename: 'rani_float_guava.jpg' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2024/7/437698230/MT/TR/BL/99399999/rani-fruit-drink-mango-flavor-240-ml.png', filename: 'rani_float_mango.png' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2024/7/437702220/IN/LH/MP/99399999/rani-fruit-drink-pineapple-flavor-240-ml.png', filename: 'rani_float_pineapple.png' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2024/7/437697839/PZ/BJ/SR/99399999/rani-fruit-drink-strawberry-banana-flavor-with-real-fruit-chunks-240-ml.png', filename: 'rani_float_strawberry_banana.png' },
    { url: 'https://restaurantsupplier1.com/wp-content/uploads/2024/08/Rani-Float-Can-Orange.jpg', filename: 'rani_float_orange.jpg' },
    { url: 'https://m.media-amazon.com/images/I/51Bp30CR3IL._AC_UF894,1000_QL80_.jpg', filename: 'redbull_energy_drink.jpg' },
    { url: 'https://m.media-amazon.com/images/I/61F1YLfg+wL._AC_UF894,1000_QL80_.jpg', filename: 'monster_energy.jpg' }
  ],
  nuts: [
    { url: 'https://regalfarm.in/wp-content/uploads/2023/02/chilly-garlic-cashew-nuts-600x537.jpg', filename: 'garlic_chilli_ko.jpg' },
    { url: 'https://vitaplusuk.com/files/products/Chilli-Cashews1.jpg', filename: 'chilli_cashew.jpg' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2024/3/396453723/IW/HD/QX/199062278/chilli-roasted-cashew-nut-500x500.webp', filename: 'peri_peri.webp' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2021/8/SS/IL/DX/91273290/green-chilli-flavored-cashew-nut-1000x1000.JPG', filename: 'green_chilli.JPG' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2023/8/337755593/WU/PZ/UG/71420723/red-chilli-masala-cashew-1000x1000.webp', filename: 'tomato_chilli.webp' },
    { url: 'https://www.davidrobertsfood.com/wp-content/uploads/2021/09/BP435-RST-CASHEWS-NO-SALT.png', filename: 'cashew_salt_roasted.png' },
    { url: 'https://cdn.ecommercedns.uk/files/8/252318/8/27580448/cashew-cheese.jpg', filename: 'cashew_cheese_roasted.jpg' },
    { url: 'http://cdn.ecommercedns.uk/files/8/252318/4/27580654/cashew-smoke.jpg', filename: 'cashew_bbq_roasted.jpg' },
    { url: 'https://www.taazashahimewa.com/assets/product/large/product_12_1102.jpg', filename: 'cashew_pepper.jpg' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2020/12/IB/MB/HC/5025272/pepper-roasted-cashew-nut-500x500.jpg', filename: 'cashew_pepper_roasted.jpg' },
    { url: 'http://kanwarjis.in/cdn/shop/files/Kaju_180.jpg?v=1727696207', filename: 'w180_cashew.jpg' },
    { url: 'https://www.bigvalueshop.com/wp-content/uploads/2020/07/Solely-Naturalz-W320-Cashew-Nuts_2nd-image_New.jpeg', filename: 'premium_plain_kaju.jpeg' },
    { url: 'http://rukmini1.flixcart.com/image/300/300/l0wrafk0/nut-dry-fruit/p/f/e/240-broken-cashew-240gram-plain-kaju-dry-fruit-nut-1-pouch-original-imagchcyfvrs43fg.jpeg', filename: 'cashew_split_ko.jpeg' },
    { url: 'https://storage.googleapis.com/shy-pub/67951/1671379765164_SKU-0212_0.jpeg', filename: 'cashew_borma.jpeg' },
    { url: 'https://www.olddelhifoods.com/wp-content/uploads/2023/05/pista.jpg', filename: 'plain_raw_pistachio.jpg' },
    { url: 'https://www.giftsmyntra.com/wp-content/uploads/2020/12/raw-pista2.jpg', filename: 'pistachio_without_shell.jpg' },
    { url: 'https://5.imimg.com/data5/QT/BA/PA/SELLER-28876823/pista-dodi-salted-500x500.jpg', filename: 'pistachio_salted.jpg' },
    { url: 'https://www.shutterstock.com/image-photo/shelled-pistachios-roasted-nuts-saffron-260nw-2169689861.jpg', filename: 'pistachio_lemon.jpg' },
    { url: 'https://www.healthbenefitstimes.com/9/gallery/almonds/Almond-nut-collection.jpg', filename: 'premium_raw_almond.jpg' },
    { url: 'https://nutterie.com/cdn/shop/products/Raw_natural_almonds_small_size_1000x1000.png?v=1629485136', filename: 'usa_small_almond.png' },
    { url: 'https://thenutlady.co.za/wp-content/uploads/2017/11/Salted_Almonds_Web.png', filename: 'almond_salt_roasted.png' },
    { url: 'https://pngimg.com/uploads/hazelnut/hazelnut_PNG36.png', filename: 'premium_whole_hazelnut.png' },
    { url: 'https://5.imimg.com/data5/SELLER/Default/2023/4/297642412/VY/TC/EV/144040848/walnut-chile-regular-1000x1000.JPG', filename: 'walnut_chillie.JPG' },
    { url: 'https://static.vecteezy.com/system/resources/previews/027/254/779/original/macadamia-nuts-with-leaves-isolated-on-transparent-background-file-cut-out-ai-generated-png.png', filename: 'macadamia.png' },
    { url: 'https://png.pngtree.com/png-clipart/20210530/original/pngtree-nut-mixed-health-png-image_6372913.jpg', filename: 'plain_nuts_mix.jpg' },
    { url: 'https://foodtolive.com/wp-content/uploads/2018/04/Organic-Sprouted-Pumpkin-Seeds-min.jpg', filename: 'pumpkin_seeds.jpg' },
    { url: 'https://tse1.mm.bing.net/th/id/OIP.Qf1yI8lqXLltAwrrfHqgAQHaFj?pid=Api&P=0&h=180', filename: 'sunflower_seeds.jpg' },
    { url: 'http://sindhidryfruits.live/cdn/shop/products/WatermelonSeeds_2.jpg?v=1679557563', filename: 'watermelon_seeds.jpg' },
    { url: 'https://5.imimg.com/data5/LI/QR/MY-7452716/chia-seeds-1000x1000.jpg', filename: 'chia_seeds.jpg' },
    { url: 'https://c8.alamy.com/comp/BN82MH/flax-seed-round-heap-on-white-BN82MH.jpg', filename: 'flax_seeds.jpg' }
  ]
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

async function downloadAll() {
  for (const [category, images] of Object.entries(imagesToDownload)) {
    console.log(`\nDownloading ${category} images...`);
    const categoryDir = `public/images/${category}`;
    
    for (const { url, filename } of images) {
      const filepath = path.join(categoryDir, filename);
      
      // Skip if file already exists
      if (fs.existsSync(filepath)) {
        console.log(`Skipped (exists): ${filename}`);
        continue;
      }
      
      try {
        await downloadImage(url, filepath);
        // Add small delay to avoid overwhelming servers
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Error downloading ${filename}:`, error.message);
      }
    }
  }
  
  console.log('\nDownload complete!');
}

downloadAll();

