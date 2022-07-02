import React, { useState } from 'react'

function About() {
  const [isTohaniCollapsed, setIsTohaniCollapsed] = useState(false)
  const [isMoldovaCollapsed, setIsMoldovaCollapsed] = useState(false)
  const [isRecasCollapsed, setIsRecasCollapsed] = useState(false)

  return (
    <div className="about-container">
      <h4>About wine</h4>
      <div className={isTohaniCollapsed ? 'tohani-section collapsed' : 'tohani-section'}>
        <div
          className="interact"
          onClick={() => {
            if (!isTohaniCollapsed) {
              setIsRecasCollapsed(false)
              setIsMoldovaCollapsed(false)
            }
            setIsTohaniCollapsed(!isTohaniCollapsed)
          }}
        >
          <h5>Tohani Wines</h5>
          <small>
            Find more <i className={isTohaniCollapsed ? 'fa-solid fa-angle-left rotate' : 'fa-solid fa-angle-left'} id="arrow-icon"></i>
          </small>
        </div>
        <span className="description">Tohani Romania is a Romanian wine company situated in Gura Vadului commune in Prahova county.</span>
        <p>
          The main wine brands in the Tohani Domains portfolio are: Tohani Domains, Tohani Estate - Escapada, Peles Castle, Princely, Ice Flowers, Tohani Estate
          - Special Reserve, Cuvee, Arum, Siel, Valahorum, Prince Radu and not in last line, APOGEUM.
        </p>
        <p>
          From 1773, Tohani attracted people with grace, who loved life, worked it, understood it and amplified its creative force. From here, from the heart of
          Dealul Mare, for over 200 years, wines are created. Each wine has its own story, intertwined with that of the genius and passion of those who created
          it. In Tohani, the earth speaks, and the people listen. And then there's wine.
        </p>
        <p>
          Tohani Romania continues its story under the sign of royalty, starting with 1930, when Prince Nicholas of Romania, the brother of King Carol II,
          became the owner of this vast domain. In these lands he meets the beautiful Ioana Dumitrescu Doletti, the daughter of a landowner from Tohani. The
          prince relinquishes the throne to follow the voice of his heart and marry Ioana Doletti. Thus, the story that touched the hearts of so many Europeans
          has been the inspiration for decades for the wines born here.
        </p>
        <p>
          In 1948, Tohani Domains became state property and in the following years, through an association with specialists from the Bordeaux area, France, the
          winery was built and preserved to this day as a place of visit and museum. Here is preserved the only wine cellar in the area, which houses over
          100,000 bottles of vintage wines.
        </p>
        <p>
          Thus, in Tohani, the mastery and skill of the oenologist, he models what nature has provided for hundreds of years. A unique terroir, tradition and
          attention to detail, are the only elements that give the possibility to create wines that define new quality standards. In these lands, recognized for
          the quality of red varieties, Feteasca Neagră finds the perfect conditions for development and achievement of perfection. The wine, obtained from this
          variety, is recognized as one of the best red wines in Romania, so Feteasca Neagră, APOGEUM, being awarded a gold medal at the most prestigious
          competition in the world, Concours Mondial De Bruxelles.
        </p>
        <p>
          Cultivated grape varieties: Fetească Neagră, Pinot Noir, Cabernet Sauvignon, Merlot, Shiraz, Fetească Albă, Fetească Regală, Tămâioasă Românească,
          Sauvignon Blanc, Riesling, Chardonnay, Busuioacă de Bohotin.
        </p>
      </div>
      <div className={isMoldovaCollapsed ? 'moldova-section collapsed' : 'moldova-section'}>
        <div
          className="interact"
          onClick={() => {
            if (!isMoldovaCollapsed) {
              setIsRecasCollapsed(false)
              setIsTohaniCollapsed(false)
            }
            setIsMoldovaCollapsed(!isMoldovaCollapsed)
          }}
        >
          <h5>Moldova Wines</h5>
          <small>
            Find more <i className={isMoldovaCollapsed ? 'fa-solid fa-angle-left rotate' : 'fa-solid fa-angle-left'} id="arrow-icon"></i>
          </small>
        </div>
        <span>Moldovan wines are those produced in the Republic of Moldova or Moldova, Romania.</span>
        <p>
          The Republic of Moldova has a well-developed wine industry, with an area of ​​148,500 hectares of vineyards, of which 107,800 hectares are used for
          commercial production. The remaining 40,700 hectares are vineyards cultivated in villages, on land near houses, used to make house wine. Many families
          have their own grape recipes that have been passed down through the generations. Most of the country's commercial wine production is for export.
        </p>
        <p>
          Many Moldovan wineries in the Soviet period were called wineries and wineries. After the fall of the communist bloc, their situation became Christian,
          some wineries withstood the crisis and reorganized, others disappeared forever.
        </p>
        <p>
          During the post-communist period, the “intersection wineries” were created: Valeria din Vale, Château Migdal-P, Château Vartely, Vinăria Fautor,
          Vinăria Cimișlia, Dionysos-Mereni, Domeninii Căinari, Vinăria Sălcuța, Vinăria Gitana. Other medium-sized wineries that have stood out for their
          quality are Timbrus Purcari Estate, Asconi Winery and Castel Mimi (named after the largest and oldest mansion across the Prut, built in the interwar
          period, today being considered a heritage.
        </p>
        <p>
          Small or "garage" wineries - This category includes all small wineries that are part of the Association of Small Wine Producers of Moldova: Crama
          Domnească (Equinox wines), Gogu Winery, EtCetera Winery, Noble Winery, Dac Winery, Atuu Winery, Agrici Winery, Poiana Winery, Unicorn Winery,
          Mezalimpe Winery, Minis Terrios, Corten Winery (formerly Molda Winery), Pelicanul Negru, Gara-Gani Winery. Most small wine producers who are part of
          the association must own up to 30 ha of vines.
        </p>
        <p>
          In addition to the great producers with a past in the past such as Château Purcari, Cricova, Mileștii-Mici, Bostavan, Vinuri Comrat, Combinatul din
          Tomai, Pivniţele de la Brănești, Kvint, Călărași Divin.
        </p>
      </div>
      <div className={isRecasCollapsed ? 'recas-section collapsed' : 'recas-section'}>
        <div
          className="interact"
          onClick={() => {
            if (!isRecasCollapsed) {
              setIsTohaniCollapsed(false)
              setIsMoldovaCollapsed(false)
            }

            setIsRecasCollapsed(!isRecasCollapsed)
          }}
        >
          <h5>Recas Wines</h5>
          <small>
            Find more <i className={isRecasCollapsed ? 'fa-solid fa-angle-left rotate' : 'fa-solid fa-angle-left'} id="arrow-icon"></i>
          </small>
        </div>
        <span>Cramele Recaș is a Romanian wine company, based in Recaș, Timiș County.</span>
        <p>
          In 1319, the Hungarian nobleman Dominik de Saar is mentioned in a chronicle of the time as the owner of the Rygachtelkue estate (Recaș). The diplomas
          of King Louis the Great from 1359 mention the donation to his sons of the Rykas property near Timiș. In the Vatican tithe lists of the Catholic
          Church, the Rykas settlement is not mentioned, hence the presumption that the population was of the Orthodox religion; Also in 1359, with the approval
          of King Louis the Great, several Romanian Orthodox families who received plots of land and other privileges were colonized. The oldest mention of the
          existence of vineyards in Recaș dates from November 11, 1447 in an act that shows that Mihail de Ciorna, Banul Severinului, bought the vineyards from
          Ioan and Ecaterina Magyar for 32 Hungarian gold florins.
        </p>
        <p>
          Cramele Recaș S.A. was established in 1991 and includes D.O.C. Recaș and I.G. Dealurile Timișului. The company's headquarters is located in Recaș,
          Timiș County. The brick cellar with vaulted rooms was built in 1945 and includes: the tasting room, located 9 m below the ground, the wine bar and the
          barrel room - with about 250 225 L oak barrels.
        </p>
        <p>
          The grape varieties grown by Cramele Recaș are: Merlot, Pinot Noir, Cabernet Franc, Syrah, Negru de Dragasani, Novac, Acalon, Cabernet Dorsa,
          Zweigelt, Cadarcă, Chardonnay, Sauvignon Blanc, Fetească Regală, Fetească Albă, Pinot Gris, Viognier, Muscat Ottonel, Furmint, Riesling Italian,
          Riesling de Rin.
        </p>
        <p>
          The climate is continental, with moderate influences from the Bega River and the hills of the Western Carpathians. The area is exposed to the sun,
          with slopes in a southerly and westerly direction.
        </p>
        <p>Soil types range from reddish-brown forest to high iron oxide soils, and the substrate is a calcareous bedrock.</p>
      </div>
    </div>
  )
}

export default About
