// src/pages/Perfume.tsx
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Star,
  Sprout,
  Truck,
  Shield,
  Crown,
  ChevronRight,
  Droplet,
  Sparkles,
  Phone,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Use the @ alias set in vite.config.ts


type PerfumeProduct = {
  id: number;
  name: string;
  basePrice: number;
  description: string;
  image?: string;
};

const perfumeProducts: PerfumeProduct[] = [
  { id: 1, name: "HUGO", basePrice: 4000, description: "HUGO", image: "/images/perfume/hugo.jpg" },
  { id: 2, name: "CALVIN KEVIN", basePrice: 3900, description: "CALVIN KEVIN PERFUME", image: "/images/perfume/calvin_kevin.jpg"  },
  { id: 3, name: "515 CHAMP", basePrice: 5000, description: "515 CHAMP", image: "/images/perfume/hugo.jpg"  },
  { id: 4, name: "ASDAAF", basePrice: 1949, description: "ASDAAF PERFUME", image: "/images/perfume/asdaaf.jpg"  },
  { id: 5, name: "EAU DE PARFUM", basePrice: 3500, description: "EAU DE PARFUM", image: "/images/perfume/eau%20de%20parfum.jpg"  },
  { id: 6, name: "YARA", basePrice: 500, description: "YARA PERFUME", image: "/images/perfume/yara.jpg"  },
  { id: 7, name: "OUD MOOD", basePrice: 2499, description: "OUD MOOD", image: "/images/perfume/oud_mood.jpg"  },
  { id: 8, name: "FERRARI", basePrice: 2999, description: "FERRARI PERFUME", image: "/images/perfume/ferrari_perfume.jpg"  },
  { id: 9, name: "BURBERRY", basePrice: 8450, description: "BURBERRY PERFUME", image: "/images/perfume/burberry.jpg"  },
  { id: 10, name: "MIDNIGHT BLUE", basePrice: 2000, description: "MIDNIGHT PERFUME", image: "/images/perfume/midnightblue.jpg"  },
  { id: 11, name: "SHAGHUF", basePrice: 2000, description: "SHAGHUF PERFUME", image: "/images/perfume/shaghuf.jpg"  },
  { id: 12, name: "SEMI WASHWASHAH", basePrice: 3400, description: "SEMI WASHWASHAH PERFUME", image: "/images/perfume/wash.jpg"  },
  // New perfumes
  { id: 13, name: "CK ONE SHOCK FOR HIM", basePrice: 3999, description: "200ml", image: "/images/perfume/ck_one_shock_him_200ml.jpg" },
  { id: 14, name: "CK ONE SHOCK FOR HIM", basePrice: 3299, description: "100ml", image: "/images/perfume/ck_one_shock_him_100ml.jpg" },
  { id: 15, name: "CK ONE SHOCK FOR HER", basePrice: 4499, description: "200ml", image: "/images/perfume/ck_one_shock_her_200ml.jpg" },
  { id: 16, name: "CK ONE SHOCK FOR HER", basePrice: 2699, description: "100ml", image: "/images/perfume/ck_one_shock_her_100ml.jpg" },
  { id: 17, name: "CK BE", basePrice: 3899, description: "100ml", image: "/images/perfume/ck_be_100ml.jpg" },
  { id: 18, name: "CKIN2U HER", basePrice: 3499, description: "100ml", image: "/images/perfume/ckin2u_her_100ml.jpg" },
  { id: 19, name: "CKIN2U HIM", basePrice: 3499, description: "100ml", image: "/images/perfume/ckin2u_him_100ml.jpg" },
  { id: 20, name: "CK ESCAPE FOR MEN", basePrice: 2499, description: "100ml", image: "/images/perfume/ck_escape_men_100ml.jpg" },
  { id: 21, name: "CK ONE", basePrice: 4649, description: "100ml", image: "/images/perfume/ck_one_100ml.jpg" },
  { id: 22, name: "CK MAN", basePrice: 2399, description: "100ml", image: "/images/perfume/ck_man_100ml.jpg" },
  { id: 23, name: "DAVID OFF CHAMPION", basePrice: 3249, description: "90ml", image: "/images/perfume/davidoff_champion_90ml.jpg" },
  { id: 24, name: "DAVID OFF THE GAME", basePrice: 3999, description: "100ml", image: "/images/perfume/davidoff_game_100ml.jpg" },
  { id: 25, name: "DAVID OFF COOL WATER", basePrice: 3499, description: "125ml", image: "/images/perfume/davidoff_cool_water_125ml.jpg" },
  { id: 26, name: "DAVID OFF HOT WATER", basePrice: 2799, description: "110ml", image: "/images/perfume/davidoff_hot_water_110ml.jpg" },
  { id: 27, name: "DUNHILL GOLD", basePrice: 4099, description: "100ml", image: "/images/perfume/dunhill_gold_100ml.jpg" },
  { id: 28, name: "HUGO BOSS MAN", basePrice: 5799, description: "200ml", image: "/images/perfume/hugo_boss_man_200ml.jpg" },
  { id: 29, name: "HUGO BOSS MAN", basePrice: 3999, description: "125ml", image: "/images/perfume/hugo_boss_man_125ml.jpg" },
  { id: 30, name: "HUGO BOSS BOTTLED", basePrice: 5999, description: "100ml", image: "/images/perfume/hugo_boss_bottled_100ml.jpg" },
  { id: 31, name: "HUGO BOSS BOTTLES NIGHT", basePrice: 5999, description: "100ml", image: "/images/perfume/hugo_boss_bottles_night_100ml.jpg" },
  { id: 32, name: "VERSACE POUR HOMME", basePrice: 5799, description: "100ml", image: "/images/perfume/versace_pour_homme_100ml.jpg" },
  { id: 33, name: "CK ETERNITY FOR MEN", basePrice: 3849, description: "100ml", image: "/images/perfume/ck_eternity_men_100ml.jpg" },
  { id: 34, name: "LACOSTE HOMME", basePrice: 5549, description: "100ml", image: "/images/perfume/lacoste_homme_100ml.jpg" },
  { id: 35, name: "LACOSTE BLANC", basePrice: 5849, description: "100ml", image: "/images/perfume/lacoste_blanc_100ml.jpg" },
  { id: 36, name: "ISSEY MIYAKE POUR HOMME", basePrice: 7449, description: "125ml", image: "/images/perfume/issey_miyake_homme_125ml.jpg" },
  { id: 37, name: "ISSEY MIYAKE INTENSE", basePrice: 4399, description: "125ml", image: "/images/perfume/issey_miyake_intense_125ml.jpg" },
  { id: 38, name: "ISSEY MIYAKE BLEUE", basePrice: 4299, description: "75ml", image: "/images/perfume/issey_miyake_bleue_75ml.jpg" },
  { id: 39, name: "SCUDERIA FERRARI BLACK", basePrice: 2499, description: "125ml", image: "/images/perfume/scuderia_ferrari_black_125ml.jpg" },
  { id: 40, name: "BENTLEY INFINITE INTENSE", basePrice: 3499, description: "100ml", image: "/images/perfume/bentley_infinite_intense_100ml.jpg" },
  { id: 41, name: "SILVER STYLE", basePrice: 3499, description: "100ml", image: "/images/perfume/silver_style_100ml.jpg" },
  { id: 42, name: "MONTBLANC LEGEND", basePrice: 6999, description: "200ml", image: "/images/perfume/montblanc_legend_200ml.jpg" },
  { id: 43, name: "MONTBLANC LEGEND RED MEN", basePrice: 5499, description: "100ml", image: "/images/perfume/montblanc_legend_red_100ml.jpg" },
  { id: 44, name: "MONTBLANC LEGEND", basePrice: 5499, description: "100ml", image: "/images/perfume/montblanc_legend_100ml.jpg" },
  { id: 45, name: "CLUB DE NUIT", basePrice: 4999, description: "105ml", image: "/images/perfume/club_de_nuit_105ml.jpg" },
  { id: 46, name: "RAVE", basePrice: 2499, description: "100ml", image: "/images/perfume/rave_100ml.jpg" },
  { id: 47, name: "EUPHORIA MEN", basePrice: 4999, description: "100ml", image: "/images/perfume/euphoria_men_100ml.jpg" },
  { id: 48, name: "JAGUAR MEN", basePrice: 2099, description: "100ml", image: "/images/perfume/jaguar_men_100ml.jpg" },
  { id: 49, name: "BURBERRY WEEKEND", basePrice: 7850, description: "100ml", image: "/images/perfume/burberry_weekend_100ml.jpg" },
  { id: 50, name: "BURBERRY LONDON", basePrice: 6700, description: "100ml", image: "/images/perfume/burberry_london_100ml.jpg" },
  { id: 51, name: "BLACK CODE PERRA KATRA", basePrice: 1299, description: "100ml", image: "/images/perfume/black_code_perra_katra_100ml.jpg" },
  { id: 52, name: "COLOUR ME PINK", basePrice: 1599, description: "100ml", image: "/images/perfume/colour_me_pink_100ml.jpg" },
  { id: 53, name: "RASASI BLUE LADY PERFUME", basePrice: 899, description: "50ml", image: "/images/perfume/rasasi_blue_lady_50ml.jpg" },
  { id: 54, name: "ONE MAN SHOW GREY", basePrice: 1499, description: "100ml", image: "/images/perfume/one_man_show_grey_100ml.jpg" },
  { id: 55, name: "ONE MAN SHOW RRUBBY RED", basePrice: 1599, description: "100ml", image: "/images/perfume/one_man_show_rrubby_red_100ml.jpg" },
  { id: 56, name: "ROYAL MIRAGE GOLD", basePrice: 1199, description: "120ml", image: "/images/perfume/royal_mirage_gold_120ml.jpg" },
  { id: 57, name: "OPEN GOLD RAGER AND GALLET", basePrice: 1449, description: "100ml", image: "/images/perfume/open_gold_rager_gallet_100ml.jpg" },
  { id: 58, name: "LAPIDUS POUR HOMME", basePrice: 2599, description: "100ml", image: "/images/perfume/lapidus_pour_homme_100ml.jpg" },
  { id: 59, name: "LOMANI POUR HOMME", basePrice: 950, description: "100ml", image: "/images/perfume/lomani_pour_homme_100ml.jpg" },
  { id: 60, name: "AZURITE", basePrice: 999, description: "100ml", image: "/images/perfume/azurite_100ml.jpg" },
  { id: 61, name: "Y DYNAMIQUE", basePrice: 999, description: "100ml", image: "/images/perfume/y_dynamique_100ml.jpg" },
  { id: 62, name: "MIDNIGHT BLUE", basePrice: 999, description: "100ml", image: "/images/perfume/midnight_blue_100ml.jpg" },
  { id: 63, name: "STRISCIA POUR FEMME", basePrice: 999, description: "100ml", image: undefined },
  { id: 64, name: "CHERRY BLOSSOM", basePrice: 999, description: "100ml", image: "/images/perfume/cherry_blossom_100ml.jpg" },
  { id: 65, name: "DYNAMIQUE INVISIBLE", basePrice: 999, description: "100ml", image: "/images/perfume/dynamique_invisible_100ml.jpg" },
  { id: 66, name: "DYNAMIQUE AMORE", basePrice: 999, description: "100ml", image: "/images/perfume/dynamique_amore_100ml.jpg" },
  { id: 67, name: "MY SPACE POUR FEMME", basePrice: 999, description: "100ml", image: undefined },
  { id: 68, name: "DYNAMIQUE 515 CHAMP", basePrice: 999, description: "100ml", image: "/images/perfume/dynamique_515_champ_100ml.jpg" },
  { id: 69, name: "DYNAMIQUE GRACIOUS", basePrice: 999, description: "100ml", image: "/images/perfume/dynamique_gracious_100ml.jpg" },
  { id: 70, name: "DYNAMIQUEBLUE DE", basePrice: 999, description: "100ml", image: "/images/perfume/dynamiqueblue_de_100ml.jpg" },
  { id: 71, name: "DYNAMIQUE FORTNITE", basePrice: 999, description: "100ml", image: "/images/perfume/dynamique_fortnite_100ml.jpg" },
  { id: 72, name: "ENCHANTEUR ENTICING PERFUMED DEO SPRAY", basePrice: 175, description: "150ml", image: "/images/perfume/enchanteur_enticing_150ml.jpg" },
  { id: 73, name: "DOVE GO FRESH APPLE AND WHITE TEA SCENT", basePrice: 260, description: "150ml", image: "/images/perfume/dove_go_fresh_apple_150ml.jpg" },
  { id: 74, name: "DOVE GO FRESH POMEGRANATE AND LEMON VERBENA SCENT", basePrice: 260, description: "150ml", image: "/images/perfume/dove_go_fresh_pomegranate_150ml.jpg" },
  { id: 75, name: "ENCHANTEUR CHARMING PURFUMED TALC", basePrice: 320, description: "250g", image: "/images/perfume/enchanteur_charming_talc_250g.jpg" },
  { id: 76, name: "ENCHANTEUR ROMANTIC PURFUMED TALC", basePrice: 320, description: "250g", image: "/images/perfume/enchanteur_romantic_talc_250g.jpg" },
  { id: 77, name: "SAVAGE DYNAMIQUE", basePrice: 999, description: "100ml", image: "/images/perfume/savage_dynamique_100ml.jpg" },
  { id: 78, name: "MARQUIS POUR FEMME", basePrice: 299, description: "175ml", image: "/images/perfume/marquis_pour_femme_175ml.jpg" },
  { id: 79, name: "BLUE FOR MEN DEODORANT", basePrice: 299, description: "100ml", image: "/images/perfume/blue_for_men_deodorant_100ml.jpg" },
  { id: 80, name: "INCONTOURNABLE BODY SPRAY", basePrice: 299, description: "200ml", image: "/images/perfume/incontournable_body_spray_200ml.jpg" },
  { id: 81, name: "AXE SIGNATURE ROUGE BODY SPRAY", basePrice: 399, description: "122ml", image: "/images/perfume/axe_signature_rouge_122ml.jpg" },
  { id: 82, name: "AXE SIGNATURE INTENSE BODY SPRAY", basePrice: 399, description: "122ml", image: "/images/perfume/axe_signature_intense_122ml.jpg" },
  { id: 83, name: "ROYAL MIRAL ORIGINAL BODY SPRAY", basePrice: 320, description: "200ml", image: "/images/perfume/royal_miral_original_200ml.jpg" },
  { id: 84, name: "GULNAR HAMIDI PERFUMED BODY SPRAY", basePrice: 499, description: "200ml", image: "/images/perfume/gulnar_hamidi_body_spray_200ml.jpg" },
  { id: 85, name: "ROMANCE DEODORANT BODY SPRAY", basePrice: 349, description: "200ml", image: "/images/perfume/romance_deodorant_body_spray_200ml.jpg" },
  { id: 86, name: "DOVE ADVANCED CARE ORIGINAL ANTI PERSPIRANT DEODORANT", basePrice: 337, description: "50ml", image: "/images/perfume/dove_advanced_care_50ml.jpg" },
  { id: 87, name: "ROMANCE PERFUME", basePrice: 1199, description: "45ml", image: "/images/perfume/romance_perfume_45ml.jpg" },
  { id: 88, name: "BAKHOOR AL AZHAR", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_al_azhar_70g.jpg" },
  { id: 89, name: "BAKHOOR OUD MAGHRIB", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_oud_maghrib_70g.jpg" },
  { id: 90, name: "BAKHOOR RAYHAN", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_rayhan_70g.jpg" },
  { id: 91, name: "BAKHOOR KHALIFA", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_khalifa_70g.jpg" },
  { id: 92, name: "BAKHOOR SHEIKHA", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_sheikha_70g.jpg" },
  { id: 93, name: "BAKHOOR AMEERA", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_ameera_70g.jpg" },
  { id: 94, name: "BAKHOOR BLACK OUD", basePrice: 599, description: "70g", image: "/images/perfume/bakhood_black_oud_70g.jpg" },
  { id: 95, name: "HAMIDI NATURAL REGAL LEATHER", basePrice: 1800, description: "50g", image: "/images/perfume/hamidi_natural_regal_leather_50g.jpg" },
  { id: 96, name: "HAMIDI NATURAL OUD", basePrice: 1800, description: "50g", image: "/images/perfume/hamidi_natural_oud_50g.jpg" },
  { id: 97, name: "HAMIDI NATURAL ROYAL VALLEY", basePrice: 1800, description: "50g", image: "/images/perfume/hamidi_natural_royal_valley_50g.jpg" },
  { id: 98, name: "HAMIDI NATURAL AMBER", basePrice: 1800, description: "50g", image: "/images/perfume/hamidi_natural_amber_50g.jpg" },
  { id: 99, name: "HAMIDI NATURAL SILK MUSK", basePrice: 1089, description: "50g", image: "/images/perfume/hamidi_natural_silk_musk_50g.jpg" },
  { id: 100, name: "KHAMRAH QAHWA", basePrice: 3500, description: "100ml", image: "/images/perfume/khamrah_qahwa_100ml.jpg" },
  { id: 101, name: "KHAMRAH LATTAFA", basePrice: 3500, description: "100ml", image: "/images/perfume/khamrah_lattafa_100ml.jpg" },
  { id: 102, name: "LATTAFA ASAD ZANZIBAR BLUE", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_asad_zanzibar_blue_100ml.jpg" },
  { id: 103, name: "LATTAFA ASAD BLACK", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_asad_black_100ml.jpg" },
  { id: 104, name: "LATTAFA YARA", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_yara_100ml.jpg" },
  { id: 105, name: "LATTAFA YARA TOUS", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_yara_tous_100ml.jpg" },
  { id: 106, name: "LATTAFA YARA CANDY", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_yara_candy_100ml.jpg" },
  { id: 107, name: "LATTAFA YARA MOI", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_yara_moi_100ml.jpg" },
  { id: 108, name: "LATTAFA ADEEB", basePrice: 1999, description: "80ml", image: "/images/perfume/lattafa_adeeb_80ml.jpg" },
  { id: 109, name: "LATTAFA BLUE OUD", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_blue_oud_100ml.jpg" },
  { id: 110, name: "LATTAFA FAKHAR LATTAFA", basePrice: 2750, description: "50ml", image: "/images/perfume/lattafa_fakhar_lattafa_50ml.jpg" },
  { id: 111, name: "LATTAFA YARA", basePrice: 999, description: "60ml", image: "/images/perfume/lattafa_yara_60ml.jpg" },
  { id: 112, name: "LATTAFA OPULENT MUSK", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_opulent_musk_100ml.jpg" },
  { id: 113, name: "LATTAFA ASAL AL TEEB", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_asal_al_teeb_100ml.jpg" },
  { id: 114, name: "LATTAFA NAJDIA PERFUM WITH PERFUMED SPRAY INSIDE", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_najdia_100ml.jpg" },
  { id: 115, name: "LATTAFA FAKHAR LATTAFA", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_fakhar_lattafa_100ml.jpg" },
  { id: 116, name: "ASDAAF AMEER AL ARAB", basePrice: 2100, description: "100ml", image: "/images/perfume/asdaaf_ameer_al_arab_100ml.jpg" },
  { id: 117, name: "ASDAAF MUADATHEE", basePrice: 1699, description: "100ml", image: "/images/perfume/asdaaf_muadathee_100ml.jpg" },
  { id: 118, name: "LATTAFA OUD BLEND", basePrice: 1499, description: "100ml", image: "/images/perfume/lattafa_oud_blend_100ml.jpg" },
  { id: 119, name: "LATTAFA KHASHABI", basePrice: 1750, description: "100ml", image: "/images/perfume/lattafa_khashabi_100ml.jpg" },
  { id: 120, name: "ALINA COREL YOU", basePrice: 999, description: "100ml", image: "/images/perfume/alina_corel_you_100ml.jpg" },
  { id: 121, name: "ALINA COREL TUNE", basePrice: 799, description: "100ml", image: "/images/perfume/alina_corel_tune_100ml.jpg" },
  { id: 122, name: "LATTAFA ANA ABIYEDH LEATHER", basePrice: 2099, description: "60ml", image: "/images/perfume/lattafa_ana_abiyedh_leather_60ml.jpg" },
  { id: 123, name: "LATTAFA ANA ABIYEDH POUDREE", basePrice: 2099, description: "60ml", image: "/images/perfume/lattafa_ana_abiyedh_poudree_60ml.jpg" },
  { id: 124, name: "PIERRA KATRA LAWRENCE", basePrice: 1499, description: "100ml", image: "/images/perfume/pierra_katra_lawrence_100ml.jpg" },
  { id: 125, name: "PIERRA KATRA GRAN POUR FEMME", basePrice: 1499, description: "100ml", image: "/images/perfume/pierra_katra_gran_femme_100ml.jpg" },
  { id: 126, name: "LATTAFA SHEIKH SHUYUKH", basePrice: 2099, description: "30ml", image: "/images/perfume/lattafa_sheikh_shuyukh_30ml.jpg" },
  { id: 127, name: "ASDAAF AMEERAT AL ARAB HAIR MIST", basePrice: 1800, description: "50ml", image: "/images/perfume/asdaaf_ameerat_al_arab_hair_mist_50ml.jpg" },
  { id: 128, name: "HAMIDI AL MUKHMAL SHAGHUF", basePrice: 2999, description: "100ml", image: "/images/perfume/hamidi_al_mukhmal_shaghuf_100ml.jpg" },
  { id: 129, name: "LATTAFA OUD MOOD", basePrice: 1999, description: "100ml", image: "/images/perfume/lattafa_oud_mood_100ml.jpg" },
  { id: 130, name: "LATTAFA SHAMNI MARRAH POUR FEMME", basePrice: 1799, description: "100ml", image: "/images/perfume/lattafa_shamni_marrah_femme_100ml.jpg" },
  { id: 131, name: "HAMIDI NATURAL AMBER PERFUM", basePrice: 1800, description: "100ml", image: "/images/perfume/hamidi_natural_amber_perfum_100ml.jpg" },
  { id: 132, name: "WASHWASHAH", basePrice: 1300, description: "100ml", image: "/images/perfume/washwashah_100ml.jpg" },
  { id: 133, name: "LATTAFA SHEIKH SHUYUKH", basePrice: 2100, description: "100ml", image: "/images/perfume/lattafa_sheikh_shuyukh_100ml.jpg" },
  { id: 134, name: "HAMIDI MUKHALLAT", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_mukhallat_15ml.jpg" },
  { id: 135, name: "HAMIDI PURE SANDAL", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_pure_sandal_15ml.jpg" },
  { id: 136, name: "HAMIDI LAMSAT AL HAREER", basePrice: 499, description: "15ml", image: "/images/perfume/hamidi_lamsat_al_hareer_15ml.jpg" },
  { id: 137, name: "HAMIDI GOLDEN DUST", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_golden_dust_15ml.jpg" },
  { id: 138, name: "HAMIDI REAL EX", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_real_ex_15ml.jpg" },
  { id: 139, name: "HAMIDI WHITE OUD", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_white_oud_15ml.jpg" },
  { id: 140, name: "HAMIDI AHASEES", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_ahasees_15ml.jpg" },
  { id: 141, name: "HAMIDI SARA", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_sara_15ml.jpg" },
  { id: 142, name: "HAMIDI MALIKATUL SULTAN", basePrice: 399, description: "15ml", image: "/images/perfume/hamidi_malikatul_sultan_15ml.jpg" },
  { id: 143, name: "VICKS VAPORUB", basePrice: 500, description: "50g", image: "/images/perfume/vicks_vaporub_50g.jpg" },
  { id: 144, name: "GOREE BEAUTYCREAM", basePrice: 420, description: "20g", image: "/images/perfume/goree_beautycream_20g.jpg" },
  { id: 145, name: "DR.RASHEL SUN CREAM", basePrice: 500, description: "60g", image: "/images/perfume/dr_rashel_sun_cream_60g.jpg" },
  { id: 146, name: "ANCIENT SKIN DOCTOR HAIR NURTURING ANTI HAIR LOSS SHAMPOO", basePrice: 800, description: "250ml", image: "/images/perfume/ancient_skin_doctor_shampoo_250ml.jpg" },
  { id: 147, name: "DR.RASHEL ARGAN OIL WITH KERATIN HAIR DEEP NOURISHMENT", basePrice: 1800, description: "60ml", image: "/images/perfume/dr_rashel_argan_oil_60ml.jpg" },
  { id: 148, name: "OMEGA PAIN KILLER", basePrice: 850, description: "120ml", image: "/images/perfume/omega_pain_killer_120ml.jpg" },
  { id: 149, name: "ST IVES BHA EXFOLIANT", basePrice: 675, description: "170g", image: "/images/perfume/st_ives_bha_exfoliant_170g.jpg" },
  { id: 150, name: "TIGER BALM LINIMENT", basePrice: 799, description: "28ml", image: "/images/perfume/tiger_balm_liniment_28ml.jpg" },
  { id: 151, name: "AXE BRAND", basePrice: 550, description: "56ml", image: "/images/perfume/axe_brand_56ml.jpg" },
  { id: 152, name: "AXE BRAND OIL", basePrice: 120, description: "3ml", image: "/images/perfume/axe_brand_oil_3ml.jpg" },
];

const features = [
  { icon: Crown, title: "Premium Quality", description: "Authentic branded perfumes" },
  { icon: Truck, title: "Fast Delivery", description: "Secure and quick shipping" },
  { icon: Shield, title: "100% Original", description: "Guaranteed authenticity" },
  { icon: Sparkles, title: "Luxury Collection", description: "Exclusive fragrances" },
];

const highlights = [
  { icon: Droplet, title: "Long Lasting", description: "Up to 12 hours of fragrance" },
  { icon: Star, title: "Premium Notes", description: "Finest quality ingredients" },
  { icon: Sprout, title: "Perfect Blend", description: "Expertly crafted scents" },
];

const Perfume: React.FC = () => {
  // store quantity per product as string (to match original UI that shows "1")
  const [selectedQuantity, setSelectedQuantity] = useState<Record<number, string>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) newFavorites.delete(productId);
      else newFavorites.add(productId);
      return newFavorites;
    });
  };

  const incrementQuantity = (productId: number) => {
    const current = parseInt(selectedQuantity[productId] || "1", 10);
    if (current < 50) {
      setSelectedQuantity((prev) => ({ ...prev, [productId]: String(current + 1) }));
    }
  };

  const decrementQuantity = (productId: number) => {
    const current = parseInt(selectedQuantity[productId] || "1", 10);
    if (current > 1) {
      setSelectedQuantity((prev) => ({ ...prev, [productId]: String(current - 1) }));
    }
  };

  const getPrice = (product: PerfumeProduct, quantity?: string | number) => {
    const qty = typeof quantity === "string" ? parseInt(quantity || "1", 10) : (quantity || 1);
    return product.basePrice * qty;
  };

  const contactWhatsApp = (productId: number) => {
    const product = perfumeProducts.find((p) => p.id === productId)!;
    const quantity = parseInt(selectedQuantity[productId] || "1", 10);
    const price = getPrice(product, quantity);
    const msg = `Hello, I'm interested in ${product.name} - Quantity: ${quantity} (Total: ₹${price}). Please assist with ordering.`;
    const url = `https://wa.me/918888095594?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-pink-700 to-rose-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
              <Crown className="h-4 w-4 text-purple-300" />
              <span className="text-sm font-medium">Premium Fragrances</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
              Luxury Perfumes
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our exclusive collection of premium fragrances from around the world
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-purple-50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 rounded-full px-8 text-lg font-semibold group"
            >
              Explore Collection
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Floating Images */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <img src="/images/perfume/bottle.png" alt="perfume" className="w-14 h-14 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <div className="absolute bottom-20 right-20 opacity-20 animate-pulse delay-300">
          <img src="/images/perfume/flower.png" alt="flower" className="w-16 h-16 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
        <div className="absolute top-1/2 right-10 opacity-20 animate-pulse delay-700">
          <img src="/images/perfume/sparkle.png" alt="sparkle" className="w-12 h-12 object-contain" onError={(e)=>{ (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 w-fit mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 text-sm md:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Why Choose Our Perfumes?
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Experience luxury and elegance in every bottle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full p-4 w-fit mx-auto mb-4">
                    <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-white">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Gallery */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-900 to-pink-900 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Luxury Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience our exclusive range of premium fragrances
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perfumeProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-700 relative"
            >
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition-all duration-300 shadow-lg"
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ${
                    favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-red-500"
                  }`}
                />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]"></div>
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-w-[75%] max-h-[75%] object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="text-8xl">🍇</div>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1 text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{product.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ₹{getPrice(product, selectedQuantity[product.id] || 1)}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">/unit</span>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 flex flex-col gap-3">
                {/* Quantity Selector with + and - buttons */}
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decrementQuantity(product.id)}
                    className="h-10 w-10 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedQuantity[product.id] || 1}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => incrementQuantity(product.id)}
                    className="h-10 w-10 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => contactWhatsApp(product.id)}
                  className="w-full rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative z-10">
              <Crown className="h-16 w-16 mx-auto mb-4 text-purple-100" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Signature Scent</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join our exclusive perfume club and receive personalized fragrance recommendations
              </p>
              <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50 shadow-xl rounded-full px-8 text-lg font-semibold">
                Join Now & Save 15%
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Perfume;
