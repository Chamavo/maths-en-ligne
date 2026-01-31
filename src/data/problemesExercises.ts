// Exercices de type examen - Classés par difficulté croissante
// Contexte urbain africain (Cameroun) - Monnaie : FCFA

export interface ProblemeExercise {
  id: number;
  niveau: 1 | 2 | 3 | 4;
  enonce: string;
  reponse: string | number | (string | number)[];  // Réponse correcte (peut être multiple pour les questions multiples)
  unite?: string;  // Unité de la réponse (km, FCFA, kg, etc.)
}

export const NIVEAU_LABELS: Record<number, { label: string; description: string }> = {
  1: { label: 'Très Facile', description: 'Opérations simples avec nombres entiers ou décimaux' },
  2: { label: 'Facile', description: 'Problèmes avec 2-3 opérations simples' },
  3: { label: 'Moyen', description: 'Problèmes avec plusieurs étapes et opérations variées' },
  4: { label: 'Assez Difficile', description: 'Problèmes complexes avec plusieurs étapes et raisonnements' },
};

export const problemesExercises: ProblemeExercise[] = [
  // ═══════════════════════════════════════════════════════════════
  // NIVEAU 1 - TRÈS FACILE
  // ═══════════════════════════════════════════════════════════════
  { id: 46, niveau: 1, enonce: "Calculer la somme de 2,325 ; 1,42 et 0,125.", reponse: 3.87 },
  { id: 47, niveau: 1, enonce: "De 14,125 retrancher 5,50.", reponse: 8.625 },
  { id: 48, niveau: 1, enonce: "Multiplier 25,24 par 100.", reponse: 2524 },
  { id: 49, niveau: 1, enonce: "Diviser 4 253,84 par 10.", reponse: 425.384 },
  { id: 50, niveau: 1, enonce: "Multiplier 3,45 par 0,01.", reponse: 0.0345 },
  { id: 52, niveau: 1, enonce: "Un kilogramme de bananes coûte 400 FCFA. Combien paie-t-on 3,500 kg de bananes ?", reponse: 1400, unite: "FCFA" },
  { id: 53, niveau: 1, enonce: "Un litre d'huile vaut 800 FCFA. Combien paiera-t-on 0,750 l ?", reponse: 600, unite: "FCFA" },
  { id: 54, niveau: 1, enonce: "Un kg de beurre de cacahuètes coûte 1 200 FCFA. On en achète 0,375 kg. Combien rend-on si l'on donne 600 FCFA pour payer ?", reponse: 150, unite: "FCFA" },
  { id: 55, niveau: 1, enonce: "Un paquet de café pèse 0,750 kg et coûte 900 FCFA. Quel est le prix du kilogramme ?", reponse: 1200, unite: "FCFA" },
  { id: 56, niveau: 1, enonce: "Une femme travaille 1 h 30 mn par jour et gagne 490 FCFA par heure. Calculer son gain journalier.", reponse: 735, unite: "FCFA" },
  { id: 57, niveau: 1, enonce: "Un quart de viande pèse 3,750 kg. Combien coûte ce quart si le kg de viande vaut 900 FCFA ?", reponse: 3375, unite: "FCFA" },
  { id: 58, niveau: 1, enonce: "Si 6 litres de lait coûtent 2 340 FCFA, combien me faut-il débourser pour 0,500 l, les prix étant proportionnels ?", reponse: 195, unite: "FCFA" },
  { id: 59, niveau: 1, enonce: "Une voiture a parcouru 8,125 km en consommant 0,650 l d'essence. Quelle distance parcourra-t-elle avec 1 l d'essence ?", reponse: 12.5, unite: "km" },

  // ═══════════════════════════════════════════════════════════════
  // NIVEAU 2 - FACILE
  // ═══════════════════════════════════════════════════════════════
  { id: 1, niveau: 2, enonce: "Il y a 512 km de Douala à Yaoundé. À quelle distance de Yaoundé se trouve un car parti de Douala qui a roulé 8 h à 45 km à l'heure ?", reponse: 152, unite: "km" },
  { id: 13, niveau: 2, enonce: "Combien faut-il d'heures pour remplir un réservoir de 1 200 l à l'aide d'un robinet qui donne 50 l en 5 minutes ?", reponse: 2, unite: "heures" },
  { id: 14, niveau: 2, enonce: "Une roue de charrette a 3 m de circonférence. Combien doit-elle faire de tours par minute pour parcourir 7 920 m à l'heure ?", reponse: 44, unite: "tours/minute" },
  { id: 16, niveau: 2, enonce: "Maman va au marché Mokolo ; elle achète 3,500 kg de pommes de terre, une botte de poireaux de 0,825 kg, 1 kg de carottes, 1,500 kg de mangues, un chou pesant 1,375 kg, 0,920 kg de salade et 0,500 kg de beignets. Son sac à provisions, vide, pèse 0,125 kg. Combien pèse-t-il plein ?", reponse: 9.745, unite: "kg" },
  { id: 17, niveau: 2, enonce: "Une pièce de tissu mesurait 28 m. Une cliente en achète 13,50 m et une deuxième 4,75 m de moins que la première. Calculer la longueur du coupon restant.", reponse: 5.75, unite: "m" },
  { id: 18, niveau: 2, enonce: "Un cantonnier doit creuser un fossé de 80 m de long. Avant-hier, il en a fait 12,50 m ; hier, 2,75 m de plus qu'avant-hier et aujourd'hui 1,25 m de plus qu'hier. Combien de mètres lui reste-t-il à faire ?", reponse: 35.75, unite: "m" },
  { id: 19, niveau: 2, enonce: "Le 3e étage de l'immeuble Tandeng est à 300,65 m du sol. Le 2e étage est 184,92 m plus bas que le 3e et le 1er 58,10 m plus bas que le 2e. À quelle hauteur se trouve le 1er étage ?", reponse: 57.63, unite: "m" },
  { id: 20, niveau: 2, enonce: "On a vendu une pièce d'étoffe en trois parties. La 1re mesure 14,75 m, la 2e a 3,50 m de plus et la 3e vaut les deux autres réunies. Quelle était la longueur de la pièce ?", reponse: 66, unite: "m" },
  { id: 21, niveau: 2, enonce: "Un fût vide pèse 79,450 kg. On y verse un poids d'huile de palme dépassant celui du fût vide de 137,250 kg. Quel est le poids du fût rempli ?", reponse: 295.15, unite: "kg" },
  { id: 22, niveau: 2, enonce: "Jean dit : « Il me manque 1,250 l d'eau pour remplir ma bonbonne, mais si on me donne 6,750 l, j'aurai 1,480 l de trop ». Quelle quantité d'eau a-t-il ?", reponse: 4.02, unite: "l" },
  { id: 23, niveau: 2, enonce: "Une bouteille vide pèse 0,340 kg ; on la remplit de miel qu'on met ensuite dans 3 pots ; le 1er en contient 1,250 kg, le 2e 0,945 kg et le 3e autant que les deux autres réunis. Combien pesait la bouteille pleine de miel ?", reponse: 4.73, unite: "kg" },
  { id: 24, niveau: 2, enonce: "Pour peser un morceau de viande, le boucher met dans un plateau de la balance : 0,500 kg, 0,200 kg, 0,100 kg et 0,050 kg. Pour parfaire l'équilibre, il met 0,015 kg à côté de la viande. L'acheteuse désirait avoir 0,850 kg de viande. A-t-elle trop ou pas assez, et combien ?", reponse: "pas assez, il manque 0,015 kg" },
  { id: 25, niveau: 2, enonce: "Le portail d'une concession mesure 5,60 m de large. Un camion chargé de bois large de 3,25 m pourra-t-il y croiser une moto-taxi large de 2,10 m ? Quel espace y aura-t-il entre les deux s'ils sont chacun à 10 cm du mur ?", reponse: "Non, espace négatif de 0,05 m" },
  { id: 31, niveau: 2, enonce: "Une chèvre et son chevreau valent ensemble 337 500 FCFA. Le prix du chevreau est le 1/4 du prix de la chèvre. Calculer le prix de chaque animal.", reponse: ["chèvre: 270 000 FCFA", "chevreau: 67 500 FCFA"] },
  { id: 39, niveau: 2, enonce: "Un ouvrier vend 32 poules à 2 800 FCFA pièce et les 3/8 de ses lapins à 900 FCFA pièce. Il encaisse 111 600 FCFA. Combien avait-il de lapins ?", reponse: 32, unite: "lapins" },
  { id: 40, niveau: 2, enonce: "Un jardin rectangulaire de 60 m de long sur 30 m de large est entouré d'une allée gravillonnée de 1,50 m de large. Quelle est la surface de l'allée ?", reponse: 282, unite: "m²" },
  { id: 41, niveau: 2, enonce: "Quel est le diamètre d'un cerceau qui a 3,768 m de circonférence ?", reponse: 1.2, unite: "m" },
  { id: 42, niveau: 2, enonce: "Calculer la surface d'un disque qui a une circonférence de 50,24 dm.", reponse: 200.96, unite: "dm²" },
  { id: 91, niveau: 2, enonce: "Une fermière a une couvée de 13 poulets. Elle vend 1 poulette et 2 coqs et mange deux autres coqs. Il lui reste autant des uns que des autres. Combien la couvée comprenait-elle de poulettes et de coqs ?", reponse: ["5 poulettes", "8 coqs"] },

  // ═══════════════════════════════════════════════════════════════
  // NIVEAU 3 - MOYEN
  // ═══════════════════════════════════════════════════════════════
  { id: 2, niveau: 3, enonce: "Un libraire achète 48 volumes à 2 400 FCFA pièce. On lui fait une remise de 21 200 FCFA sur sa facture. Calculer son bénéfice s'il revend chaque livre 2 600 FCFA.", reponse: 30800, unite: "FCFA" },
  { id: 4, niveau: 3, enonce: "Dans une famille, le père gagne 64 000 FCFA par mois, la mère 9 000 FCFA par semaine et le fils 11 600 FCFA par quinzaine. Combien cette famille gagne-t-elle par an ?", reponse: 1515200, unite: "FCFA" },
  { id: 6, niveau: 3, enonce: "Maman achète 3,50 m de pagne à 2 400 FCFA le mètre, 3 chemises à 5 200 FCFA l'une, 4 boubous à 5 600 FCFA l'un et un foulard. Elle donne 50 000 FCFA pour payer et on lui rend 2 200 FCFA. Combien coûte le foulard ?", reponse: 7800, unite: "FCFA" },
  { id: 7, niveau: 3, enonce: "Un marchand a acheté 40 poulets pour 46 400 FCFA et 300 œufs pour 10 800 FCFA. En les revendant, il a gagné 400 FCFA par poulet, mais il a perdu 200 FCFA par douzaine d'œufs. Combien a-t-il gagné ou perdu en tout ?", reponse: "gagné 11 000 FCFA" },
  { id: 8, niveau: 3, enonce: "Une fermière achète 15 m de toile à 2 400 FCFA le m et 9 m de tissu wax à 3 600 FCFA le m. Elle paye ses achats avec le prix de vente de 16 kg de beurre à 1 800 FCFA le kg, de 15 poulets à 2 200 FCFA l'un et de 8 douzaines d'œufs à 400 FCFA la douzaine. Combien lui manque-t-il ?", reponse: 2200, unite: "FCFA" },
  { id: 9, niveau: 3, enonce: "Un marchand livre 720 assiettes réparties dans 3 caisses. La première en contient 11 douzaines, et la seconde le triple de la première. Quelle est la valeur de chacune des caisses, si une assiette vaut 800 FCFA ?", reponse: ["1re: 105 600 FCFA", "2e: 316 800 FCFA", "3e: 153 600 FCFA"] },
  { id: 10, niveau: 3, enonce: "Une hirondelle détruit en moyenne 50 chenilles par jour. Chaque couple d'hirondelles a 8 petits. Combien 5 couples et leurs petits détruiront-ils de chenilles pendant le 3e trimestre ?", reponse: 230000, unite: "chenilles" },
  { id: 11, niveau: 3, enonce: "Deux hommes se partagent une somme d'argent. La part du 1er, qui vaut 7 fois la part du 2e, la surpasse de 151 200 FCFA. Quelle est la part de chacun ?", reponse: ["1er: 176 400 FCFA", "2e: 25 200 FCFA"] },
  { id: 26, niveau: 3, enonce: "Pour faire 1 kg de peinture, un artisan utilise 0,620 kg de minium à 500 FCFA le kg, 0,250 kg d'huile de lin à 272 FCFA le kg, 0,105 kg d'essence à 120 FCFA le kg et 0,025 kg de siccatif à 96 FCFA le kg. Il lui faut 4 kg de cette peinture qui vaut dans le commerce 560 FCFA le kg. Quelle économie fait-il ?", reponse: 827.6, unite: "FCFA" },
  { id: 27, niveau: 3, enonce: "Au départ d'un voyage, le compteur d'une voiture marquait 2 845,8 km et à l'arrivée 3 251,4 km. Cette voiture consomme 7,50 l d'essence et 0,175 l d'huile aux 100 km. L'essence valant 650 FCFA et l'huile 1 000 FCFA le litre, calculer la dépense.", reponse: 26486.1, unite: "FCFA" },
  { id: 28, niveau: 3, enonce: "On peint de 3 couches de peinture les murs d'une classe qui ont une surface de 45,38 m². Il faut excepter 3,88 m² pour les ouvertures. À raison de 0,240 kg de peinture à 960 FCFA le kg par m², quelle sera la dépense ?", reponse: 28598.4, unite: "FCFA" },
  { id: 29, niveau: 3, enonce: "Une fermière a 3 vaches qui fournissent chacune 12 l de lait par jour. Si 1 l de lait donne 1/2 hg de beurre valant 1 440 FCFA le kg, combien la fermière a-t-elle reçu pendant le mois d'avril ?", reponse: 77760, unite: "FCFA" },
  { id: 30, niveau: 3, enonce: "Une ménagère achète 24,500 kg de porc à 1 200 FCFA le kg ; elle le sale avec 3,75 kg de sel à 50 FCFA le kg et 0,250 kg de salpêtre à 130 FCFA le kg. Elle obtient ainsi 23,650 kg de porc salé qu'elle paierait 1 560 FCFA le kg au moment de sa consommation. Quelle économie fait-elle ?", reponse: 7056.5, unite: "FCFA" },
  { id: 32, niveau: 3, enonce: "On achète une maison et un terrain pour 1 504 800 FCFA. Le prix de la maison est les 5/6 de celui du terrain dont la surface est 34 200 m². Quel est le prix d'un m² du terrain ?", reponse: 24, unite: "FCFA" },
  { id: 33, niveau: 3, enonce: "Une route mesure 2 700 m, un cours d'eau occupe 1/15 de la longueur de la route, une maison les 4/27 et un pont les 2/45 du reste. Quelle est la longueur du pont ?", reponse: 96, unite: "m" },
  { id: 34, niveau: 3, enonce: "Un fermier achète un veau les 3/4 de ce que vaut sa chèvre. Il devrait payer en tout 472 500 FCFA, mais on lui fait une remise de 1/10. Quel est le prix de la chèvre, sachant qu'après paiement il lui reste 25 500 FCFA ?", reponse: 270000, unite: "FCFA" },
  { id: 35, niveau: 3, enonce: "Une fille et son frère se partagent 45 600 FCFA. La sœur prend 5/8 de la somme et dépense les 3/5 de sa part. Combien lui reste-t-il ?", reponse: 11400, unite: "FCFA" },
  { id: 36, niveau: 3, enonce: "Un car roule à raison de 60 km à l'heure et un camion à raison de 40 km. La distance qu'ils font ensemble vaut les 3/5 de 750 km. Combien de temps chacun a-t-il roulé ?", reponse: ["car: 4h30", "camion: 4h30"] },
  { id: 37, niveau: 3, enonce: "Trois femmes achètent en commun des articles de ménage. La 1re paie les 2/5 de la dépense, la 2e les 3/7 du reste et la 3e 63 000 FCFA. Combien ont-elles dépensé ?", reponse: 183750, unite: "FCFA" },
  { id: 38, niveau: 3, enonce: "Un récipient contient 42 litres d'eau. Une ménagère en tire d'abord les 2/7, puis les 3/8 du reste. Combien en reste-t-il dans le récipient ?", reponse: 18.75, unite: "litres" },
  { id: 60, niveau: 3, enonce: "Les 4/5 de 1 kg de coton pur coûtent 800 FCFA. Combien coûteront les 5/8 de ce poids ?", reponse: 625, unite: "FCFA" },
  { id: 61, niveau: 3, enonce: "En 14 jours, à raison de 7 h par jour, un ouvrier gagne 125 440 FCFA. Combien a-t-il touché par heure ?", reponse: 1280, unite: "FCFA" },
  { id: 62, niveau: 3, enonce: "Combien de mètres d'étoffe peut-on acheter avec 66 000 FCFA, si un coupon de 18 m coûte 48 600 FCFA ?", reponse: 24.44, unite: "m" },
  { id: 63, niveau: 3, enonce: "Une ménagère a payé un panier d'ignames 4 800 FCFA. À ce prix-là, avec 6 000 FCFA, elle aurait pu acheter 5 ignames de plus. Combien a-t-elle acheté d'ignames ?", reponse: 20, unite: "ignames" },
  { id: 64, niveau: 3, enonce: "On achète du riz dans un village à 240 FCFA le kg. On le revend en ville en faisant un bénéfice de 25 % et on reçoit 10 800 FCFA. Quel poids de riz a-t-on vendu ?", reponse: 36, unite: "kg" },
  { id: 65, niveau: 3, enonce: "Un libraire a acheté 25 livres à 1 080 FCFA l'un. Il en revend une partie à 1 400 FCFA le livre et fait un bénéfice de 6 400 FCFA. Combien de livres lui reste-t-il ?", reponse: 5, unite: "livres" },
  { id: 66, niveau: 3, enonce: "Un fermier a vendu 2 vaches pour 270 000 FCFA. La 1re lui a rapporté un bénéfice de 15 000 FCFA et il a perdu 20 000 FCFA sur l'autre. Il a donc gagné en tout 20 000 FCFA. Combien avait-il payé chaque vache ?", reponse: ["1re vache: prix d'achat = prix de vente - 15000", "2e vache: prix d'achat = prix de vente + 20000"] },
  { id: 67, niveau: 3, enonce: "Un marchand achète pour 75 000 FCFA de coton. Pour être payé, il lui reste à vendre 5 kg. Combien de kg avait-il achetés si le kg coûte 2 500 FCFA ?", reponse: 30, unite: "kg" },
  { id: 68, niveau: 3, enonce: "3 tailleurs ont fait un bénéfice de 198 000 FCFA à partager entre eux. Le premier a le 1/3 du total, le second les 2/5 et le troisième le reste. Quelle est la part de chacun ?", reponse: ["1er: 66 000 FCFA", "2e: 79 200 FCFA", "3e: 52 800 FCFA"] },
  { id: 69, niveau: 3, enonce: "Dans un sac, il y a des arachides et du manioc pour un poids total de 57 kg. Le poids du manioc est les 2/3 de celui des arachides. Calculer le poids de chaque denrée.", reponse: ["arachides: 34,2 kg", "manioc: 22,8 kg"] },
  { id: 70, niveau: 3, enonce: "Pour transporter 3 tonnes de marchandises, on se sert d'un camion qui peut porter 0,600 t à chaque voyage. Si chaque voyage coûte 6 000 FCFA, quel sera le prix total du transport ?", reponse: 30000, unite: "FCFA" },
  { id: 71, niveau: 3, enonce: "Un commerçant vend 3 coupes de pagne de 6 m de long l'une à raison de 4 800 FCFA le mètre. Combien recevra-t-il sachant qu'il doit consentir au client une remise de 5 % ?", reponse: 82080, unite: "FCFA" },
  { id: 72, niveau: 3, enonce: "On partage 1 012 000 FCFA de la façon suivante : le 1/2 au 1er, le 1/3 au 2e et le reste au 3e. Que reçoit celui-ci ?", reponse: 168666.67, unite: "FCFA" },
  { id: 73, niveau: 3, enonce: "Un marchand a acheté 68 kg de sucre à 400 FCFA le kg. Il en vend une certaine quantité à 400 FCFA le kg et le reste à 500 FCFA le kg, faisant ainsi un bénéfice de 5 600 FCFA. Calculer le poids de sucre vendu à chaque prix.", reponse: ["à 400 FCFA: 12 kg", "à 500 FCFA: 56 kg"] },
  { id: 74, niveau: 3, enonce: "Deux garçons ont gagné 113 000 FCFA. Le 1er en a autant que 2 fois et 1/2 de ce qu'a le 2e. Combien chacun a-t-il ?", reponse: ["1er: 80 714 FCFA", "2e: 32 286 FCFA"] },
  { id: 75, niveau: 3, enonce: "Un automobiliste remplit le réservoir de sa voiture. Au bout de 12 jours, il en a consommé les 5/8. 15 jours après, il ne reste plus que le 1/6 de la quantité d'essence qu'il avait encore après 12 jours. Quelle fraction de la quantité primitive a-t-il dépensée ?", reponse: "7/8" },
  { id: 76, niveau: 3, enonce: "Un marchand a acheté 25 kg de riz à 240 FCFA le kg. Il en vend d'abord 1/5, puis les 4/7 du reste et enfin ce qui lui reste. Combien a-t-il dû vendre le kg de riz, à chacune des trois fois, pour faire un bénéfice de 1 500 FCFA à la 1re vente, de 1 800 FCFA à la 2e, et de 1 200 FCFA à la 3e ?", reponse: ["1re vente: 540 FCFA/kg", "2e vente: 365 FCFA/kg", "3e vente: 390 FCFA/kg"] },
  { id: 77, niveau: 3, enonce: "Deux personnes se partagent une somme d'argent. L'une d'elles reçoit les 5/7 de la somme et a 80 400 FCFA de plus que l'autre. Quelle était la somme à partager ?", reponse: 187600, unite: "FCFA" },
  { id: 78, niveau: 3, enonce: "Un jardin rectangulaire a un périmètre de 216 m. Sa longueur est les 5/3 de sa largeur. Calculer sa surface.", reponse: 2430, unite: "m²" },
  { id: 79, niveau: 3, enonce: "Un menuisier achète 45 m de bois de placage à 840 FCFA le m et 8 pots de colle à 560 FCFA le pot. Il paie avec un billet de 50 000 FCFA. Quelle somme lui rend-on ?", reponse: 7720, unite: "FCFA" },
  { id: 80, niveau: 3, enonce: "Un instituteur a employé le 1/4 de son traitement pour se loger, les 2/5 pour se nourrir, les 7/20 pour ses distractions et a économisé le reste qui s'élève à 3 750 FCFA. Quel est le montant de son traitement ?", reponse: 75000, unite: "FCFA" },
  { id: 81, niveau: 3, enonce: "On partage 80 000 FCFA en 3 parts proportionnelles aux nombres 4, 5 et 7. Quelle est la valeur de chaque part ?", reponse: ["1re: 20 000 FCFA", "2e: 25 000 FCFA", "3e: 35 000 FCFA"] },
  { id: 82, niveau: 3, enonce: "Deux enfants ont mis leurs économies en commun. Le 1er a donné 800 FCFA et le 2e 1 000 FCFA. Ils achètent un jeu qu'ils revendent avec un bénéfice de 630 FCFA. Combien chacun aura-t-il en tout ?", reponse: ["1er: 1 080 FCFA", "2e: 1 350 FCFA"] },
  { id: 83, niveau: 3, enonce: "Un marchand achète 480 kg de sucre à 400 FCFA le kg et fait un bénéfice de 16 000 FCFA en les revendant tous. Quel bénéfice aurait-il fait en vendant 75 kg de moins au même prix ?", reponse: 13500, unite: "FCFA" },
  { id: 84, niveau: 3, enonce: "Un marchand achète un lot de bétail pour 900 000 FCFA. Il revend ce lot en faisant un bénéfice de 1/5 sur le prix d'achat. Quelle est la recette ?", reponse: 1080000, unite: "FCFA" },
  { id: 85, niveau: 3, enonce: "Un artisan achète de l'étoffe à 2 250 FCFA le m pour faire des robes. Si le prix du mètre était de 2 500 FCFA, il aurait 3 m de tissu de moins pour la somme dont il dispose. Combien de robes peut-il faire, s'il faut 2,50 m d'étoffe par robe ?", reponse: 12, unite: "robes" },
  { id: 86, niveau: 3, enonce: "Pour sa bicyclette, un élève achète un pneu à 8 640 FCFA et une chambre à air à 4 320 FCFA. Au bout de 9 mois, il revend le tout à raison de 720 FCFA par mois d'usage et fait ainsi une perte de 3 600 FCFA. Combien a-t-il revendu ?", reponse: 9360, unite: "FCFA" },
  { id: 87, niveau: 3, enonce: "Trois cars parcourent la même distance. L'un emploie 8 litres d'essence, l'autre 7,250 l et le 3e fait les 3/4 de la dépense du 1er. Calculer la consommation du 3e véhicule.", reponse: 6, unite: "litres" },
  { id: 88, niveau: 3, enonce: "Les 2/3 du prix d'une voiture sont payés comptant et 1/4 au bout de 6 mois. Combien reste-t-il à verser sur un compte de 1 600 000 FCFA ?", reponse: 133333.33, unite: "FCFA" },
  { id: 89, niveau: 3, enonce: "Un marchand achète du coton à 360 FCFA le kg. Il en a revendu 2 quintaux à 400 FCFA le kg et en revend encore pour 28 800 FCFA. Il lui en reste 50 kg. Combien avait-il acheté de kg de coton ?", reponse: 322, unite: "kg" },
  { id: 90, niveau: 3, enonce: "Un rouleau de linoléum de 35 m² a été payé 1 440 FCFA le m². Une partie ayant été déchirée, le m² du reste revient à 1 680 FCFA. Quelle surface a été détériorée ?", reponse: 5, unite: "m²" },
  { id: 92, niveau: 3, enonce: "Une marchande des quatre saisons a acheté des oranges à 190 FCFA le kg. Elle en trouve 3 kg qui sont avariées et invendables. Elle vend celles qui restent à 114 FCFA le demi-kg, ne faisant ainsi ni bénéfice ni perte. Combien de kg d'oranges avait-elle achetés ?", reponse: 18, unite: "kg" },
  { id: 106, niveau: 3, enonce: "Un domestique est loué à l'année pour 438 000 FCFA. Il commence son service le 31 décembre à minuit et le cesse le 17 juillet à minuit. Combien lui doit-on ?", reponse: 239400, unite: "FCFA" },
  { id: 107, niveau: 3, enonce: "Un ouvrier gagne 37 200 FCFA en 17 jours de travail. Il ne travaille ni le samedi, ni le dimanche. Combien économise-t-il en un an s'il dépense 31 000 FCFA par mois ?", reponse: 196080, unite: "FCFA" },
  { id: 108, niveau: 3, enonce: "Une tonne de sel de mer donne 32 kg de sel. Combien de m³ d'eau faut-il faire évaporer pour obtenir un demi-quintal de sel, sachant que le litre d'eau de mer pèse 1 025 g ?", reponse: 1.52, unite: "m³" },
  { id: 109, niveau: 3, enonce: "Le café coûte 640 FCFA le 1/4 de kg. Quel est le prix d'une tasse de café si l'on emploie 45 g de café pour 3 tasses ?", reponse: 38.4, unite: "FCFA" },
  { id: 110, niveau: 3, enonce: "Un marchand de couleurs achète 75 litres d'huile de palme pour 36 000 FCFA. Il vend cette huile en bidons de 3 litres et fait un bénéfice de 1/5 sur le prix d'achat. Calculer le prix de vente d'un bidon.", reponse: 1728, unite: "FCFA" },
  { id: 112, niveau: 3, enonce: "Un champ de 160 m de long et 80 m de large donne normalement 25 q de maïs à l'ha. La grêle a détruit 15 % de la récolte. Combien vendra-t-on cette récolte, si on la vend à 7 600 FCFA le quintal ?", reponse: 206720, unite: "FCFA" },
  { id: 114, niveau: 3, enonce: "Un libraire fait une remise de 8 % sur les livres qu'il vend. Une école lui achète 26 livres d'histoire à 1 480 FCFA l'un et 35 livres de sciences à 1 520 FCFA pièce. Quel est le montant de la facture après remise ?", reponse: 84326.4, unite: "FCFA" },
  { id: 119, niveau: 3, enonce: "Un piéton fait 1 200 m en 15 mn. Quelle distance aura-t-il parcourue en marchant de 9 h 30 à 16 h 20, s'il s'est arrêté 1 h 15 ?", reponse: 26800, unite: "m" },
  { id: 122, niveau: 3, enonce: "Un cycliste part de Yaoundé à 6 h 45 mn le matin pour se rendre à Mbalmayo où il arrive à 12 h 10. Quelle est sa vitesse horaire, la distance entre les deux villes étant de 82,500 km ?", reponse: 15.23, unite: "km/h" },

  // ═══════════════════════════════════════════════════════════════
  // NIVEAU 4 - ASSEZ DIFFICILE
  // ═══════════════════════════════════════════════════════════════
  { id: 3, niveau: 4, enonce: "Deux maçons gagnent 400 FCFA par heure. L'un travaille 8 h par jour, l'autre 7 h. Combien chacun d'eux a-t-il gagné en une année, si, en plus des dimanches, ils se reposent 25 jours ?", reponse: ["1er: 800 000 FCFA", "2e: 700 000 FCFA"] },
  { id: 5, niveau: 4, enonce: "Dans un champ, on coupe 3 fois l'herbe dans l'année. La 2e coupe donne 760 kg de foin de moins que la 1re et la troisième 1 500 kg de moins que la 2e. Calculer la valeur de la 3e coupe à 1 600 FCFA le quintal, si la 1re coupe a donné 6 760 kg de foin.", reponse: 72000, unite: "FCFA" },
  { id: 12, niveau: 4, enonce: "Une ménagère met en conserve : 8 douzaines d'œufs à 300 FCFA la douzaine, 6 douzaines à 500 FCFA la douzaine et 9 douzaines à 400 FCFA la douzaine. Elle achète 6 paquets de produit à conserver les œufs à 200 FCFA pièce. Elle consomme les œufs en hiver alors qu'ils valent 600 FCFA la douzaine ; elle n'a eu que 4 œufs gâtés. Quelle économie a-t-elle faite ?", reponse: 4500, unite: "FCFA" },
  { id: 15, niveau: 4, enonce: "Un maraîcher a vendu pour 62 400 FCFA de tomates. S'il en avait vendu 7 quintaux de plus, il aurait reçu 98 800 FCFA. 1° Quel est le prix du quintal ? — 2° Quel est le poids de tomates vendues ?", reponse: ["1° 5 200 FCFA/quintal", "2° 12 quintaux"] },
  { id: 43, niveau: 4, enonce: "Dans un rectangle de 15 m de périmètre, la longueur a 3,50 m de plus que la largeur. Calculer la surface de ce rectangle.", reponse: 8, unite: "m²" },
  { id: 44, niveau: 4, enonce: "Dans une course à pied de 2 km, 6 concurrents franchissent la ligne d'arrivée. L'écart entre le 1er et le 2e est de 110 m, entre le 2e et le 3e de 95 m, entre le 3e et le 4e de 115 m, entre le 4e et le 5e de 80 m et entre le 5e et le 6e de 90 m. Calculer pour chacun le chemin parcouru au moment où le 1er franchit l'arrivée.", reponse: ["1er: 2000m", "2e: 1890m", "3e: 1795m", "4e: 1680m", "5e: 1600m", "6e: 1510m"] },
  { id: 45, niveau: 4, enonce: "Un enfant achète un livre en 4 paiements. Au 1er paiement, il donne les 2/5 du prix, au 2e les 2/3 du reste, au 3e les 4/7 du nouveau reste et au 4e les 1 800 FCFA qui restent à payer. Combien a-t-il payé le livre ?", reponse: 10500, unite: "FCFA" },
  { id: 51, niveau: 4, enonce: "Un fût d'huile de palme pèse 88,450 kg. On le vide dans 4 bidons. Le 1er contient 22,125 kg ; le 2e, 3,375 kg de plus que le 1er ; le 3e, autant que le 1er et le 2e réunis. Combien reste-t-il pour le 4e bidon, si le fût vide pèse 6,325 kg ?", reponse: -11.125, unite: "kg" },
  { id: 93, niveau: 4, enonce: "Maman achète un poulet vivant pesant 3,800 kg, à raison de 320 FCFA le kg. Le poids de la peau représente le 1/5 du poids total et celui des os et des abats le 1/4 du poids total. À combien revient le kg de viande sans os ?", reponse: 581.82, unite: "FCFA" },
  { id: 94, niveau: 4, enonce: "Un marchand achète 108 kg de savon frais à raison de 240 FCFA le kg. En séchant, le savon perd 1/9 de son poids. Combien le marchand devra-t-il vendre le kg de savon sec pour faire un bénéfice égal aux 2/9 du prix d'achat ?", reponse: 326.25, unite: "FCFA" },
  { id: 95, niveau: 4, enonce: "Un marchand de bétail achète 25 porcs de 150 kg chacun à 480 FCFA le kg. Il en revend 4 avec une perte de 6 000 FCFA par animal. Il en perd 3 autres par maladie. Combien doit-il vendre chacun de ceux qui lui restent pour faire un bénéfice de 120 000 FCFA sur son achat ?", reponse: 113333.33, unite: "FCFA" },
  { id: 96, niveau: 4, enonce: "Un épicier achète 3 bidons d'huile de palme de 48 l chacun à 600 FCFA le kg. Il revend cette huile 720 FCFA le kg. Dans chaque bidon il y a 200 g de déchet. L'un des bidons a fui et a perdu 1 kg d'huile. Quel bénéfice total l'épicier a-t-il fait si 1 l d'huile pèse 0,900 kg ?", reponse: 14328, unite: "FCFA" },
  { id: 97, niveau: 4, enonce: "Un commerçant reçoit 25 douzaines de verres qui lui sont facturées 2 480 FCFA l'une. Il paye en outre 5 % du prix d'achat en frais d'emballage et de transport. Au déballage, il casse 21 verres. Combien devra-t-il vendre une douzaine de verres qui restent pour gagner 1/5 du prix de revient ?", reponse: 3531.43, unite: "FCFA" },
  { id: 98, niveau: 4, enonce: "Un ajusteur travaille en moyenne 26 jours par mois. Il dépense 57 200 FCFA par mois, et économise annuellement 187 200 FCFA. Quel est son gain journalier ?", reponse: 2800, unite: "FCFA" },
  { id: 99, niveau: 4, enonce: "On a employé un ouvrier pendant 28 jours et un autre pendant 17 jours. Ils ont reçu ensemble 58 250 FCFA. Sachant que le 1er gagnait 1 270 FCFA par jour, quel est le salaire quotidien du 2e ?", reponse: 1330, unite: "FCFA" },
  { id: 100, niveau: 4, enonce: "Un ouvrier a travaillé 260 journées de 8 h dans l'année, savoir : 130 j à 280 FCFA l'heure, 80 j à 320 FCFA l'heure, 50 j à 340 FCFA l'heure. Quel est son salaire journalier moyen ?", reponse: 2432, unite: "FCFA" },
  { id: 101, niveau: 4, enonce: "Si un ouvrier gagnait 12 000 FCFA de plus par trimestre, il pourrait dépenser 1 400 FCFA par jour et économiser 73 000 FCFA par an. Quel est son gain annuel ?", reponse: 536000, unite: "FCFA" },
  { id: 102, niveau: 4, enonce: "Deux ouvriers travaillent le même nombre de jours et reçoivent : l'un 57 600 FCFA et l'autre 48 000 FCFA. Le 1er gagne 400 FCFA par jour de plus que l'autre. Quel est le gain journalier de chacun ?", reponse: ["1er: 2 400 FCFA", "2e: 2 000 FCFA"] },
  { id: 103, niveau: 4, enonce: "Un jardinier travaille 6 jours par semaine de 7 h à 11 h 30 le matin et de 14 h à 17 h 30 l'après-midi. Il calcule qu'en dépensant 1 840 FCFA par jour, il lui manquerait au bout d'une semaine 1 360 FCFA. Quel est son salaire horaire ?", reponse: 200, unite: "FCFA" },
  { id: 104, niveau: 4, enonce: "Un employé dépense 10 000 FCFA par semaine pour sa nourriture, 1 600 FCFA par quinzaine pour s'éclairer et se chauffer, 6 000 FCFA par mois pour ses distractions, 6 000 FCFA par trimestre de loyer et 30 000 FCFA par semestre pour ses vêtements. Il économise mensuellement 7 000 FCFA. Quel est son gain annuel ? (Compter 24 quinzaines.)", reponse: 770400, unite: "FCFA" },
  { id: 105, niveau: 4, enonce: "Un menuisier qui travaille 6 jours de 8 h par semaine, gagne 360 FCFA par heure. Chaque semaine il fait en plus 4 h de travail supplémentaire pour lesquelles son salaire horaire normal est majoré de 50 %. Calculer son gain annuel, sachant qu'on lui retient 5 % pour la Sécurité sociale, et qu'il reçoit 17 000 FCFA d'allocation familiale chaque mois.", reponse: 1107936, unite: "FCFA" },
  { id: 111, niveau: 4, enonce: "Trois personnes achètent, à raison de 241 800 FCFA l'ha, un champ rectangulaire de 90 m de périmètre et 120 m de long. Combien chacun devra-t-il payer, les parts étant égales ?", reponse: -27810, unite: "FCFA" },
  { id: 113, niveau: 4, enonce: "Un jardin a été acheté à raison de 30 FCFA le m². On en vend les 2/5 en faisant un bénéfice de 20 % sur le prix d'achat. La recette est de 201 600 FCFA. Quelle est la surface du jardin et son prix d'achat ?", reponse: ["surface: 14 000 m²", "prix d'achat: 420 000 FCFA"] },
  { id: 115, niveau: 4, enonce: "Un capital de 500 000 FCFA rapporte 6 250 FCFA en 90 j. À quel taux a-t-il été placé ?", reponse: 5, unite: "%" },
  { id: 116, niveau: 4, enonce: "Une somme de 76 000 000 FCFA a produit 5 700 000 FCFA d'intérêt. Si elle était restée placée 6 mois de plus, elle aurait produit 7 600 000 FCFA d'intérêt. Calculer le taux du placement.", reponse: 5, unite: "%" },
  { id: 117, niveau: 4, enonce: "La lumière se propage à la vitesse de 300 000 km à la seconde et met 8 mn 18 s pour nous venir du soleil. Quelle est la distance de la terre au soleil ?", reponse: 149400000, unite: "km" },
  { id: 118, niveau: 4, enonce: "La piste d'un vélodrome mesure 3,250 hm. Un coureur qui fait 2 tours en 1 mn y roule pendant 1 h 20 mn. Quelle distance a-t-il parcourue ?", reponse: 52, unite: "km" },
  { id: 120, niveau: 4, enonce: "Deux cyclistes partent ensemble. Le 1er fait 24 km à l'heure, l'autre 18 km. À quelle distance seront-ils l'un de l'autre après avoir roulé 3 h 35 mn ?", reponse: 21.5, unite: "km" },
  { id: 121, niveau: 4, enonce: "Deux cars partent à 7 h, l'un de Douala, l'autre de Yaoundé, et roulent l'un vers l'autre. L'un fait 85 km à l'heure, l'autre 35. Ils se croisent à 10 h 30. Quelle est la distance de Douala à Yaoundé ?", reponse: 420, unite: "km" },
  { id: 123, niveau: 4, enonce: "À l'entrée d'un quartier de 5 500 m de long, une pancarte indique : « Vitesse maxima 40 km à l'heure ». Un automobiliste met 1 mn 30 s pour traverser ce quartier et se voit dresser un procès-verbal. Il proteste. A-t-il tort ou raison ? Pourquoi ?", reponse: "tort, sa vitesse était de 220 km/h (5,5 km en 1,5 min = 220 km/h)" },
  { id: 124, niveau: 4, enonce: "Deux cyclistes roulant dans le même sens sont séparés par 25 km. Le 1er fait 17 km à l'heure, l'autre 22 km. Au bout de combien de temps le 2e aura-t-il rattrapé le 1er ?", reponse: 5, unite: "heures" },
  { id: 125, niveau: 4, enonce: "Deux cars partent en même temps de 2 villes distantes de 36 km et vont l'un vers l'autre. Ils se rencontrent au bout de 1 h 20 mn. Le premier fait 18 km à l'heure. Quelle est la vitesse horaire du second ?", reponse: 9, unite: "km/h" },
];

// Obtenir les exercices par niveau
export const getProblemesByNiveau = (niveau: number): ProblemeExercise[] => {
  return problemesExercises.filter(ex => ex.niveau === niveau);
};

// Obtenir un exercice par son index global
export const getProblemeByIndex = (index: number): ProblemeExercise | undefined => {
  return problemesExercises[index];
};

// Nombre total d'exercices
export const TOTAL_PROBLEMES = problemesExercises.length;
