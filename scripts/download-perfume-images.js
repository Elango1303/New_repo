import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const perfumeImagesDir = path.join(__dirname, '../public/images/perfume');

// Create directory if it doesn't exist
if (!fs.existsSync(perfumeImagesDir)) {
  fs.mkdirSync(perfumeImagesDir, { recursive: true });
}

// Image URLs mapping
const imagesToDownload = [
  { url: 'https://m.media-amazon.com/images/I/71krJY-iqCL._AC_UF894,1000_QL80_.jpg', filename: 'ck_one_shock_him_200ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/480/perfume/k/r/q/eau-de-toilette-calvin-klein-100-one-shock-men-original-imadzfg7d5qfmkzj.jpeg?q=90', filename: 'ck_one_shock_him_100ml.jpg' },
  { url: 'https://www.perfume24x7.com/cdn/shop/products/CalvinKleinCKOneShockEauDeToiletteForHer200mlA.jpg?v=1664546542', filename: 'ck_one_shock_her_200ml.jpg' },
  { url: 'https://geniesbox.com/wp-content/uploads/2024/11/CK-One-Shock-for-Her-100ml.png', filename: 'ck_one_shock_her_100ml.jpg' },
  { url: 'https://images-static.nykaa.com/media/catalog/product/0/3/03c501788300104406_4.jpg?tr=w-500', filename: 'ck_be_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71iiBSiIJRL._AC_UF1000,1000_QL80_.jpg', filename: 'ckin2u_her_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61gefLjEDGL._AC_UF894,1000_QL80_.jpg', filename: 'ckin2u_him_100ml.jpg' },
  { url: 'https://www.perfume24x7.com/cdn/shop/products/Calvin_Klein_Escape_EDT_For_Men.jpg?v=1569305654&width=720', filename: 'ck_escape_men_100ml.jpg' },
  { url: 'https://fragstalk.in/wp-content/uploads/2023/01/CK-One-100ML-EDT.png', filename: 'ck_one_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/480/perfume/s/k/z/eau-de-toilette-men-calvin-klein-100-man-original-imadkxazhs2vkpr3.jpeg?q=90', filename: 'ck_man_100ml.jpg' },
  { url: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/15903082/2021/10/22/1c32b804-8160-40c4-ac70-0c0b65ea25d41634903741894DAVIDOFF1.jpg', filename: 'davidoff_champion_90ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61YLo2cMeQL._AC_UF350,350_QL80_.jpg', filename: 'davidoff_game_100ml.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/1833/7915/products/davidoff-cool-water-eau-de-toilette-natural-spray-for-men-125ml-2415-105474-5565b8d851292bb855a189857c25d940.jpg?v=1491568019', filename: 'davidoff_cool_water_125ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71Hn6XPKr+L._AC_UF894,1000_QL80_.jpg', filename: 'davidoff_hot_water_110ml.jpg' },
  { url: 'https://www.thedealoutlet.com/dw/image/v2/BGBX_PRD/on/demandware.static/-/Sites-thedealoutlet-master-catalog/default/dw2d6be259/images/010215366282_1.jpg?sw=669&sh=1124', filename: 'dunhill_gold_100ml.jpg' },
  { url: 'https://i.ebayimg.com/images/g/boEAAOSw-qNmnLI5/s-l1600.jpg', filename: 'hugo_boss_man_200ml.jpg' },
  { url: 'https://beautifulstore.in/wp-content/uploads/2024/02/N2-5.jpg', filename: 'hugo_boss_man_125ml.jpg' },
  { url: 'https://www.lojaglamourosa.com/resources/medias/shop/products/thumbnails/shop-brand-large/shop-pf-00052-03-boss-bottled-edt-vap---100-ml--1.jpg', filename: 'hugo_boss_bottled_100ml.jpg' },
  { url: 'https://images-static.nykaa.com/media/catalog/product/5/6/56da999NYHUG00000001_2.jpg?tr=w-500', filename: 'hugo_boss_bottles_night_100ml.jpg' },
  { url: 'https://beautybaskets.in/wp-content/uploads/2021/02/987-600x600.webp.jpg', filename: 'versace_pour_homme_100ml.jpg' },
  { url: 'https://www.aarfragrances.com/public/uploads/all/HGaOyyjtLXg04iaBJv9bQiVzR1fsK3NWhJCtRpPl.jpg', filename: 'ck_eternity_men_100ml.jpg' },
  { url: 'https://www.lacoste.in/media/catalog/product/l/c/lc013a01_000_31_1.jpg', filename: 'lacoste_homme_100ml.jpg' },
  { url: 'https://images-cdn.ubuy.co.in/6642c8845a72776d371b43e4-lacoste-l-12-12-white-blanc-by-lacoste.jpg', filename: 'lacoste_blanc_100ml.jpg' },
  { url: 'https://images-static.nykaa.com/media/catalog/product/e/e/eebaa5f3423470311365ab_ab2.jpg?tr=w-500', filename: 'issey_miyake_homme_125ml.jpg' },
  { url: 'https://beautybaskets.in/wp-content/uploads/2021/02/Issey-Miyake-Leau-Dissey-Intense-Edt-For-Men-125Ml-1200x1200.png.jpg', filename: 'issey_miyake_intense_125ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41kzt9hBZvL._UF1000,1000_QL80_.jpg', filename: 'issey_miyake_bleue_75ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/480/kh5607k0/perfume/g/y/h/125-black-eau-de-toilette-eau-de-toilette-scuderia-ferrari-men-original-imafx84ttyz5kdg8.jpeg?q=90', filename: 'scuderia_ferrari_black_125ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/k3uhhu80/perfume/j/t/q/100-infinite-intense-eau-de-parfum-bentley-men-original-imaf6nfrggzu5nar.jpeg?q=90', filename: 'bentley_infinite_intense_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/480/xif0q/perfume/l/p/r/100-silver-style-pour-homme-eau-de-toilette-instyle-men-original-imagjteebmz7jw6k.jpeg?q=90', filename: 'silver_style_100ml.jpg' },
  { url: 'https://media.landmarkshops.in/cdn-cgi/image/h=1125,w=1125,q=85,fit=cover/lifestyle/1000012774324-1000012774323_02-2100.jpg', filename: 'montblanc_legend_200ml.jpg' },
  { url: 'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000493111866/qi98Rz8D67u-000000000493111866_2.jpg', filename: 'montblanc_legend_red_100ml.jpg' },
  { url: 'https://media.landmarkshops.in/cdn-cgi/image/h=1125,w=1125,q=85,fit=cover/lifestyle/1000012774324-1000012774323_02-2100.jpg', filename: 'montblanc_legend_100ml.jpg' },
  { url: 'https://perfumepalace.in/cdn/shop/files/13_faf7bd0e-5131-4c07-b16e-aa5b91f6ad19.png?v=1747469494', filename: 'club_de_nuit_105ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61uZcMDxZZL._AC_UF1000,1000_QL80_.jpg', filename: 'rave_100ml.jpg' },
  { url: 'https://images-static.nykaa.com/media/catalog/product/2/e/2ec8a1565102404000_2.jpg?tr=w-500', filename: 'euphoria_men_100ml.jpg' },
  { url: 'https://img.tatacliq.com/images/i18//437Wx649H/MP000000007906660_437Wx649H_202407190006462.jpeg', filename: 'jaguar_men_100ml.jpg' },
  { url: 'https://beautybaskets.in/wp-content/uploads/2021/02/burberry-weekend-w-edp-100ml-new-1200x1200.jpg', filename: 'burberry_weekend_100ml.jpg' },
  { url: 'https://fragstalk.in/wp-content/uploads/2024/02/Burberry-London-Woman-EDP-100ml.png', filename: 'burberry_london_100ml.jpg' },
  { url: 'https://f.nooncdn.com/p/v1629903354/N50426364A_1.jpg?width=1200', filename: 'black_code_perra_katra_100ml.jpg' },
  { url: 'https://images-cdn.ubuy.co.in/67dcca4ed8ead662c6078b56-colour-me-neon-pink-by-milton-lloyd.jpg', filename: 'colour_me_pink_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51g5sNpATeL._AC_UF1000,1000_QL80_.jpg', filename: 'rasasi_blue_lady_50ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/81ceHMTa84L._AC_UF350,350_QL80_.jpg', filename: 'one_man_show_grey_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61M6d3nH3ZL._AC_UF1000,1000_QL80_.jpg', filename: 'one_man_show_rrubby_red_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/jtoorrk0/deodorant/p/t/7/120-gold-eau-de-cologne-parfume-for-men-women-120ml-perfume-body-original-imafex85f6m6cgdq.jpeg?q=90', filename: 'royal_mirage_gold_120ml.jpg' },
  { url: 'https://www.bbassets.com/media/uploads/p/l/40108270_1-open-vaporisateur-natural-spray-gold-roger-gallet.jpg', filename: 'open_gold_rager_gallet_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/480/jc9egsw0/perfume/t/q/t/100-lapidus-pour-homme-by-eau-de-toilette-eau-de-toilette-ted-original-imafff8kdmguh3ft.jpeg?q=90', filename: 'lapidus_pour_homme_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61eartZ4jFL.jpg', filename: 'lomani_pour_homme_100ml.jpg' },
  { url: 'https://dynamiquebeauty.com/wp-content/uploads/2025/07/Azurite-EDP-100ml-Unisex-291x300.jpg', filename: 'azurite_100ml.jpg' },
  { url: 'https://down-id.img.susercontent.com/file/id-11134207-7rasl-m2e4gxcg8p6y5b', filename: 'y_dynamique_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/31OKQg1EhbL._AC_UF1000,1000_QL80_.jpg', filename: 'midnight_blue_100ml.jpg' },
  { url: 'https://img.lazcdn.com/g/p/fee8008048171aac739ef4b73db20cf3.png_960x960q80.png_.webp', filename: 'cherry_blossom_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/31wMg+LE+rL._AC_UF1000,1000_QL80_.jpg', filename: 'dynamique_invisible_100ml.jpg' },
  { url: 'https://dynamiquebeauty.com/wp-content/uploads/2025/03/Premier-Amore-Dynamique-Women-EDP-100ml-Spray.jpeg', filename: 'dynamique_amore_100ml.jpg' },
  { url: 'https://dynamiquebeauty.com/wp-content/uploads/2025/03/515-CHAMP-1.jpg', filename: 'dynamique_515_champ_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41iAMEleiuL.jpg', filename: 'dynamique_gracious_100ml.jpg' },
  { url: 'https://dynamiquebeauty.com/wp-content/uploads/2025/07/Bleu-De-Dynamique-EDP-100ml-Men-291x300.jpg', filename: 'dynamiqueblue_de_100ml.jpg' },
  { url: 'https://dynamiquebeauty.com/wp-content/uploads/2025/03/D.PRM_.-FORTNITE-1.jpg', filename: 'dynamique_fortnite_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51JDMj52TmL._AC_UF1000,1000_QL80_.jpg', filename: 'enchanteur_enticing_150ml.jpg' },
  { url: 'https://static-images.jumbo.com/product_images/301020220753_474238BUS-1_360x360_2.png', filename: 'dove_go_fresh_apple_150ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/31YqZaG98IL._AC_UF1000,1000_QL80_.jpg', filename: 'dove_go_fresh_pomegranate_150ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51KtMYDV4nL._AC_UF1000,1000_QL80_.jpg', filename: 'enchanteur_charming_talc_250g.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51kywayKCPL._AC_UF1000,1000_QL80_.jpg', filename: 'enchanteur_romantic_talc_250g.jpg' },
  { url: 'https://m.media-amazon.com/images/I/310wTILrsDL.jpg', filename: 'savage_dynamique_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51VRbLG1WuL._AC_UF1000,1000_QL80_.jpg', filename: 'marquis_pour_femme_175ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51dGlD5VONL._AC_UF1000,1000_QL80_.jpg', filename: 'blue_for_men_deodorant_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51C70U91WOL._AC_UF1000,1000_QL80_.jpg', filename: 'incontournable_body_spray_200ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51hnVe6gcTS._AC_UF1000,1000_QL80_.jpg', filename: 'axe_signature_rouge_122ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/41C4MgkJnPL._AC_UF1000,1000_QL80_.jpg', filename: 'axe_signature_intense_122ml.jpg' },
  { url: 'https://images-static.nykaa.com/media/catalog/product/8/1/818ef1a752590041450_1.jpg?tr=w-500', filename: 'royal_miral_original_200ml.jpg' },
  { url: 'https://www.khanelkhaliliusa.com/cdn/shop/files/gulnar_2048x2048.png?v=1750116457', filename: 'gulnar_hamidi_body_spray_200ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61kDwVGPp8L._AC_UF1000,1000_QL80_.jpg', filename: 'romance_deodorant_body_spray_200ml.jpg' },
  { url: 'https://static.beautytocare.com/cdn-cgi/image/width=1600,height=1600,f=auto/media/catalog/product//d/o/dove-original-advanced-care-72h-anti-perspirant-stick-50ml.jpg', filename: 'dove_advanced_care_50ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume/a/t/u/45-romance-fragrance-perfume-edp-for-women-with-free-gift-from-original-imahgxk8hjbnejjr.jpeg?q=90', filename: 'romance_perfume_45ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61+ocsYC0BS._AC_UF894,1000_QL80_.jpg', filename: 'bakhood_al_azhar_70g.jpg' },
  { url: 'https://hamidi.ae/cdn/shop/files/Oud-Magrib-Box.jpg?v=1726571742', filename: 'bakhood_oud_maghrib_70g.jpg' },
  { url: 'https://cdn.salla.sa/onqKZz/5445f86f-f323-4f59-bf35-93c4cc36a11f-750x1000-vOcnG1VRVOQ0hAD0BpFLSMaWEhieCSvMZw2f9rab.jpg', filename: 'bakhood_rayhan_70g.jpg' },
  { url: 'https://www.armadaperfumes.com/cdn/shop/files/Hamidi_Khalifa_Bakhoor_70_Grams.jpg?v=1744899319', filename: 'bakhood_khalifa_70g.jpg' },
  { url: 'https://m.media-amazon.com/images/I/616bC8b5GTS.jpg', filename: 'bakhood_sheikha_70g.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61UQJpdV4XS.jpg', filename: 'bakhood_ameera_70g.jpg' },
  { url: 'https://m.media-amazon.com/images/I/31AiJbBfnSL._AC_UF1000,1000_QL80_.jpg', filename: 'bakhood_black_oud_70g.jpg' },
  { url: 'https://cdn.salla.sa/onqKZz/9f2d672d-1b47-4e58-9829-79a9d81facd8-750x1000-FlREmeOAZZekVdhVhHeF0wiOIpmNc8lRwrw8tJ0Z.jpg', filename: 'hamidi_natural_regal_leather_50g.jpg' },
  { url: 'https://cdn.salla.sa/onqKZz/f5b0b6fb-4c81-4188-a9f1-66a1118ce536-750x1000-BIhaSJwPVZYSsZNaZqirP0s33yA3Wess5rQi200O.jpg', filename: 'hamidi_natural_oud_50g.jpg' },
  { url: 'https://cdn.salla.sa/onqKZz/ee3f83ff-6d34-4923-a6ed-cb895edcb289-750x1000-JLUG0HfYaxbWCVOWLm6kQXjSET8TdHIiAL2v0WUZ.jpg', filename: 'hamidi_natural_royal_valley_50g.jpg' },
  { url: 'https://tuzzut.com/cdn/shop/files/61DwP1cttoL_800x.jpg?v=1733756657', filename: 'hamidi_natural_amber_50g.jpg' },
  { url: 'https://cdn.salla.sa/onqKZz/d66853eb-7628-4361-920e-97aaa2f980d0-750x1000-SXlTjkkKuos0mSKuHh7fLJ97Qb086sywVvwwhwHx.jpg', filename: 'hamidi_natural_silk_musk_50g.jpg' },
  { url: 'https://wholesale55.com/wp-content/uploads/2024/11/Khamrah-Qahwa-EDP-100-ml-Unisex-by-Lattafa-1.jpg.jpeg', filename: 'khamrah_qahwa_100ml.jpg' },
  { url: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/25664248/2023/10/28/3ab29c16-6aa0-4a81-95c5-ec8d9f9e79a01698474230236LattafaKHAMRAH100mlEDPforUnisex1.jpg', filename: 'khamrah_lattafa_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61aYG2haQlL._AC_UF1000,1000_QL80_.jpg', filename: 'lattafa_asad_zanzibar_blue_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/710W8AMXoYL._AC_UF1000,1000_QL80_.jpg', filename: 'lattafa_asad_black_100ml.jpg' },
  { url: 'https://perfumepalace.in/cdn/shop/products/65_dadb8e4c-2a03-4686-b3ae-badbd891c395.jpg?v=1666588963', filename: 'lattafa_yara_100ml.jpg' },
  { url: 'https://www.intenseoud.com/cdn/shop/files/Yara_Tous.png?v=1721506218', filename: 'lattafa_yara_tous_100ml.jpg' },
  { url: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2025/APRIL/7/DJs5z8cw_bd2da6bc596b49f8bee785bd491e10c0.jpg', filename: 'lattafa_yara_candy_100ml.jpg' },
  { url: 'https://images-cdn.ubuy.co.in/66a637b6d9a25376f40d8842-lattafa-yara-moi-eau-de-parfum-spray-for.jpg', filename: 'lattafa_yara_moi_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71Y6MArBbIL._AC_UF1000,1000_QL80_.jpg', filename: 'lattafa_adeeb_80ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume/d/n/c/100-blue-oud-eau-de-parfum-lattafa-men-original-imah76ahhfp9xgtv.jpeg?q=90', filename: 'lattafa_blue_oud_100ml.jpg' },
  { url: 'https://media.storeus.com/images/product/168423364964635da67926b.jpg', filename: 'lattafa_fakhar_lattafa_50ml.jpg' },
  { url: 'https://microless.com/cdn/products/8e16df1cb398babb0d9b645d97f54230-hi.jpg', filename: 'lattafa_yara_60ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume/c/0/n/100-opulent-musk-eau-de-parfum-100ml-for-long-lasting-oriental-original-imahe9wgyw4czpgp.jpeg?q=90', filename: 'lattafa_opulent_musk_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71pBw3HRrEL._AC_UF1000,1000_QL80_.jpg', filename: 'lattafa_asal_al_teeb_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume/f/t/l/100-najdia-with-free-deodorant-inside-eau-de-parfum-lattafa-men-original-imahay3ghx23djzj.jpeg?q=90', filename: 'lattafa_najdia_100ml.jpg' },
  { url: 'https://perfumepalace.in/cdn/shop/files/Decant_Sample_Of_Lattafa_Pride_Fakhar_Women_Eau_De_Parfum_10ml_For_Women.webp?v=1758613241', filename: 'lattafa_fakhar_lattafa_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/480/k3yrte80/perfume/r/y/b/100-ameer-al-arab-eau-de-parfum-100ml-eau-de-parfum-asdaaf-men-original-imafmz4fdsm2cyrz.jpeg?q=90', filename: 'asdaaf_ameer_al_arab_100ml.jpg' },
  { url: 'https://nearstore.com/cdn/shop/files/FXP567068_800x@2x.jpg?v=1762270613', filename: 'asdaaf_muadathee_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61WF-B0EjML._AC_UF1000,1000_QL80_.jpg', filename: 'lattafa_oud_blend_100ml.jpg' },
  { url: 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/15074112/2022/7/19/1beb1e01-9943-48fa-80f6-3a5c4ff484ea1658221888315LattafaKhashabiEauDePerfum100ml1.jpg', filename: 'lattafa_khashabi_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51FnycFTQZL.jpg', filename: 'alina_corel_you_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51xCn4-+4DL.jpg', filename: 'alina_corel_tune_100ml.jpg' },
  { url: 'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/19362910/2022/8/3/713acd1b-d2c8-4067-9a94-5d936450588e1659516633287PerfumeandBodyMist2.jpg', filename: 'lattafa_ana_abiyedh_leather_60ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/711-+K9jPqL._AC_UF350,350_QL80_.jpg', filename: 'lattafa_ana_abiyedh_poudree_60ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61nrJAU-+5L._AC_UF1000,1000_QL80_.jpg', filename: 'pierra_katra_lawrence_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71CYj6F3fKL.jpg', filename: 'pierra_katra_gran_femme_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/704/844/xif0q/perfume/3/n/o/100-sheik-al-shuyuk-eau-de-parfume-100ml-eau-de-parfum-lattafa-original-imahay3g9egeguke.jpeg?q=20&crop=false', filename: 'lattafa_sheikh_shuyukh_30ml.jpg' },
  { url: 'https://media.s-bol.com/3pYlWq35Kzo4/qyB31p/550x534.jpg', filename: 'asdaaf_ameerat_al_arab_hair_mist_50ml.jpg' },
  { url: 'https://aura-parfume.ru/image/catalog/0000000000000000000000000000000000000000000000000000000018/00002/3333/IMG_6389.JPG', filename: 'hamidi_al_mukhmal_shaghuf_100ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/shopsy-perfume/x/f/a/100-oud-mood-eau-de-parfum-lattafa-men-women-original-imah8u9hmsnvhadm.jpeg?q=90', filename: 'lattafa_oud_mood_100ml.jpg' },
  { url: 'https://www.oriental-style.de/cdn/shop/files/bd72597f29cc790b7ee3639cee0e2cb9.png?crop=center&height=1200&v=1751851927&width=1200', filename: 'lattafa_shamni_marrah_femme_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61r2DecuWCL.jpg', filename: 'hamidi_natural_amber_perfum_100ml.jpg' },
  { url: 'https://www.bjutip.com/image/cache/catalog/Perfumes/Women/6456874097129_1-800x800.jpg', filename: 'washwashah_100ml.jpg' },
  { url: 'https://orientaldream.b-cdn.net/1686-medium_default/lattafa-sheikh-shuyukh-khusoosi-edp-100ml.jpg', filename: 'lattafa_sheikh_shuyukh_100ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51YT7PN4l+L._AC_UF1000,1000_QL80_.jpg', filename: 'hamidi_mukhallat_15ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/perfume/f/5/f/15-pure-sandal-cpo-15ml-attar-perfume-oil-for-men-and-women-original-imahewc99hngnhk9.jpeg?q=90', filename: 'hamidi_pure_sandal_15ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61HhcJP7HKL.jpg', filename: 'hamidi_lamsat_al_hareer_15ml.jpg' },
  { url: 'https://www.hamidi.us/cdn/shop/files/d7600b_f69be516d1fc45e096aef95e7187bb8f_mv2.webp?v=1715020254', filename: 'hamidi_golden_dust_15ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51fHD3x1C+L.jpg', filename: 'hamidi_real_ex_15ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/61aIZvOjaCL._AC_UF1000,1000_QL80_.jpg', filename: 'hamidi_white_oud_15ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/31c4WKF99kL._AC_UF1000,1000_QL80_.jpg', filename: 'hamidi_ahasees_15ml.jpg' },
  { url: 'https://files.glotr.uz/pages/2025/11/03/2025-11-03-12-39-33-916551-28608f07871b7e82c71791005f7fba24.webp?_=ozbol', filename: 'hamidi_sara_15ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/81-O7E9soEL._AC_UF1000,1000_QL80_.jpg', filename: 'hamidi_malikatul_sultan_15ml.jpg' },
  { url: 'https://pharmazone.com/cdn/shop/files/15073-VICKSVAPORUB50GM.webp?v=1746542619', filename: 'vicks_vaporub_50g.jpg' },
  { url: 'https://redtize.com/wp-content/uploads/2020/11/goree-beauty-cream.jpg', filename: 'goree_beautycream_20g.jpg' },
  { url: 'https://mohsenistore.com/cdn/shop/files/51Hmm3a7_tL._AC_UF1000_1000_QL80.jpg?v=1718451262', filename: 'dr_rashel_sun_cream_60g.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/jy7kyvk0/shampoo/g/z/b/250-hair-nurturing-anti-hair-loss-shampoo-skin-doctor-original-imafghwcrgvh45rj.jpeg?q=90', filename: 'ancient_skin_doctor_shampoo_250ml.jpg' },
  { url: 'https://f.nooncdn.com/p/v1645111969/N52616995A_1.jpg?width=800', filename: 'dr_rashel_argan_oil_60ml.jpg' },
  { url: 'https://bf1af2.akinoncloudcdn.com/products/2024/09/12/73371/5a0db961-33a3-48f1-b5e3-af8ed4c981e7.jpg', filename: 'omega_pain_killer_120ml.jpg' },
  { url: 'https://m.media-amazon.com/images/I/71WKctKA-IL._AC_UF350,350_QL80_.jpg', filename: 'st_ives_bha_exfoliant_170g.jpg' },
  { url: 'https://m.media-amazon.com/images/I/51enfXuC+cL._AC_UF1000,1000_QL80_.jpg', filename: 'tiger_balm_liniment_28ml.jpg' },
  { url: 'https://rukminim2.flixcart.com/image/480/640/xif0q/body-pain-relief/b/i/9/56-universal-oil-imported-authentic-1-bottle-axe-brand-original-imahebhxwgpggd8d.jpeg?q=90', filename: 'axe_brand_56ml.jpg' },
  { url: 'https://images.apollo247.in/pub/media/catalog/product/A/X/AXE0055_1-JULY23_1.jpg?tr=q-80,f-webp,w-400,dpr-3,c-at_max%20400w', filename: 'axe_brand_oil_3ml.jpg' },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
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

async function main() {
  console.log('Starting perfume image downloads...\n');
  
  for (const item of imagesToDownload) {
    const filepath = path.join(perfumeImagesDir, item.filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`Skipped (exists): ${item.filename}`);
      continue;
    }
    
    try {
      await downloadImage(item.url, filepath);
      console.log(`Downloaded: ${item.filename}`);
    } catch (error) {
      console.error(`Failed to download ${item.filename}: ${error.message}`);
    }
  }
  
  console.log('\nPerfume image download complete!');
}

main().catch(console.error);

