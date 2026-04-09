# Nuottiopas-sovellus

Nuottiopas on yksinkertainen suomenkielinen harjoitteluohjelma nuottien opetteluun. Tavoite on harjoitella nuottien tunnistamista ja saada jokaisesta vastauksesta selkeä palaute.

Sovelluksessa on kaksi näkymää: asetusten valinta ja harjoitusnäkymä.

## Asetukset

Nuottiavain
* G-avain
* F-avain
* C-avain

Vaikeustaso
* Helppo
* Keskitaso
* Vaikea

Tehtävien lukumäärä
* Määrittää harjoituksen tehtävien lukumäärän

Tauot
* Kyllä
* Ei

## Vaikeustasot

Helppo
* Ei etumerkkejä
* Vain neljäsosanuotteja

Keskitaso
* Ei etumerkkejä
* Puoli- ja neljäsosanuotteja
* Mukana nuottiviivaston ylä- ja alapuolisia nuotteja

Vaikea
* Etumerkkejä
* Eri kestoisia nuotteja välillä 1 - 1/8
* Mukana nuottiviivaston ylä- ja alapuolisia nuotteja

Tauot ovat erillinen asetus. Jos tauot ovat päällä, niitä voi tulla millä tahansa vaikeustasolla. Tauon todennäköisyys on 25 %.

## Harjoituksen kulku

Sovellus arpoo käyttäjälle asetusten mukaisen nuotin tai tauon.

Käyttäjä vastaa näppäimistöllä tai hiirellä:
* Nuotin nimi annetaan kirjaimilla C, D, E, F, G, A, H
* Ylennys annetaan ylänuolella
* Alennus annetaan alanuolella
* Poikkeus: alennettu H annetaan kirjaimella B
* Kesto annetaan näppäimillä 1, 2, 4 ja 8
* Tauon kohdalla valitaan vain kesto

Oletuksena valinta on neljäsosanuotti ilman etumerkkiä. Vastaus vahvistetaan enterillä.

Ruudulla näkyvät myös painikkeet eri valinnoille. Näppäinpainallus korostaa vastaavaa painiketta, ja vastauksen voi tehdä myös hiirellä.

## Palaute

Jokaisen vastauksen jälkeen käyttäjälle kerrotaan:
* menikö vastaus oikein vai väärin
* mikä oli oikea vastaus
* oikea nimi sanallisesti, esimerkiksi Cis, neljäsosanuotti

Samalla oikeat valinnat korostetaan hetkeksi ruudulla. Seuraava tehtävä näytetään automaattisesti noin kahden sekunnin kuluttua.

## Harjoituksen päättyminen

Harjoitus päättyy, kun asetettu tehtävien määrä on tehty.

Lopuksi näytetään yksinkertainen yhteenveto:
* oikeiden korkeuksien osuus
* oikeiden etumerkkien osuus
* oikeiden kestojen osuus
* taukojen kohdalla oikeiden kestojen osuus

Yhteenvedon jälkeen käyttäjä voi:
* aloittaa uuden harjoituksen samoilla asetuksilla
* palata asetuksiin

