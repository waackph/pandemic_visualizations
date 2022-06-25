## Questions

1. What influence had the dominant covid variant on the number of covid cases?
2. How many covid cases are there in relation to overall reported tests?
3. How did the pandemic influence German society regarding specific indicators?
4. For future - Question: Did the measures against covid have an influence on the cases of infections?

## Data to use

1. Overall covid cases (or hospitalization) in time unit, dates of dominant covid variant change
2. Overall covid cases in time unit in relation to amount of tests (or positive test rate)
3. Different indicator data on some time unit basis for the time horizon of at least 2018-2019 (before pandemic) and 2020-2022 (after pandemic)
    1. CO2 -> there seems no data available for the time frame of the corona pandemic in germany yet. 
    2. Diskriminierungfälle
    3. BIP
4. Identify two federal states that have different dates on taking measures and see if there is an influence of the measurement (Look into the "oberkategorien" of the measures-dataset)

#### Defining discrimination w.r.t. police statistics

The anti discrimination law (AGG) has [multiple laws](http://www.agg-ratgeber.de/de/ihre-rechte/strafrecht.html) regarding it. So all laws will be counted as a discrimination.

### Data sources

- [RKI](https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/nCoV_node.html;jsessionid=6028AD7703AF01EAF065B59CD2C1335C.internet111#doc13490882bodyText12)
- [corona-daten-deutschland](https://www.corona-daten-deutschland.de/dataset/)
- [Crime statistics](https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/pks_node.html)
    - [Straftatenkatalog](https://www.bka.de/SharedDocs/Downloads/DE/Publikationen/PolizeilicheKriminalstatistik/2021/Interpretation/01_div_Dok/Straftatenkatalog.pdf?__blob=publicationFile&v=4)
- [GENESIS Database of Federal Office of Statistics](https://www-genesis.destatis.de/genesis/online)
- [GovData - Data provided by public authorities](https://www.govdata.de/)

## Steps

- Visualize covid case data in jupyter notebook
    - Arrange covid case data
    - Visualize covid cases from beginning of pandemic to now
    - add dates of beginning and change of dominant covid variant
    - see todos in jupyter notebook
- Create github page for visualization repository
    - Create by template
    - add html, css, JS, D3 for general visualization capability
    - recreate covid case visualizations using D3
