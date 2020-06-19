/*
PREMIERE
1 LUNES
2 MARTES
3 MIERCOLES
4 JUEVES
5 VIERNES
6 SABADO
7 DOMINGO

STATION
1 PRIMAVERA
2 VERANO    
3 OTOÑO
4 INVIERNO

STATUS
1 Online
2 Detenido
3 Finalizado
*/
const animes = [
  {
    name: 'Ahiru no Sora',
    episode: 40,
    date: '2020-04-03',
    station: 4,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3dfngJxssQiHhMEo8-rhGpFqbGymRre530oyxoIsNnPKC1QszqMzkCPYR1xsptP38w1sE2fJktIkMM7nLJMX8tKWUEd0L3TXiDAzOv9tBVJpN2vpllxilC-64h-ZYgevO2J0kVloc-gfrFyVNC5tPZa=w482-h664-no',
    description:
      'Sora Kurumatani, robusto, débil pero muy apasionado, ingresa a la preparatoria Kuzuryuu con la esperanza de cumplir los deseos de su madre de dominar su primer torneo de preparatoria. Sin embargo, el club de baloncesto, convertido en guarida para delincuentes, ¡hace todo menos jugar al baloncesto! Los miembros de su club, Momoharu Hanazono, un hábil bloqueador que puede hacer saltos de poder pero es horrible disparando, y su hermano gemelo Chiaki, un talentoso armador, también ha perdido interés en el deporte. Con solo un juego abrumado por la adrenalina y la emoción, y el amor puro de Sora por el juego, el espíritu juvenil del baloncesto se reaviva.',
    source: 'https://animeflv.net/anime/ahiru-no-sora',
    status: 1,
    season: 1,
    premiere: 3,
  },
  {
    name: 'Appare Ranman!',
    episode: 12,
    date: '2020-04-03',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3fLOJgnQiqYpAdjFtNP_4tNbgQAKOlgZCYErjx1_4_bCivYBoVatCqaqxH6u7WWwwCyK_XzCeBDoKt_BdmP21A_vkKrxMyzd6ku90YbcEoAV5knsVeoCNnl6VxDLzCNcNI9Z0sKHewb-huS6wjSOHAh=w464-h664-no',
    description:
      'La historia se desarrollará al final del siglo XIX, cerca ya del inicio del nuevo siglo. Tras ciertas circunstancias, el brillante pero socialmente inepto ingeniero Sorano Appare y el cobarde samurái Isshiki Kosame, se encuentran en un barco que va de Japón a América. Ambos deciden competir en la Trans-America Wild Race para hacerse con su primer premio y regresar a Japón. Así, ambos enfrentarán a rivales tarados, criminales y al propio entorno en una carrera salvaje por el viejo Oeste que irá desde su salida en Los Ángeles hasta la meta en Nueva York... en un coche a vapor que ellos mismos construyen.',
    source: 'https://animeflv.net/anime/appareranman',
    status: 2,
    season: 1,
    premiere: 1,
    // tags: [
    //   'Comedy',
    //   'War',
    //   'Drama|Horror',
    //   'Comedy|Drama|Romance',
    //   'Drama|Thriller',
    //   'Comedy',
    //   'Action|Drama|War',
    //   'Drama',
    // ],
  },
  {
    name: 'Arte',
    episode: 12,
    date: '2020-04-04',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3ciFqzJvDcyV8J6Jxp5GzNcYSaEwaLKOo7qpWVr-EN7ni2Sx37uoE0sGExOhzpxmhbVVrqj4clqS6flZcdFm-gHAChBfpIO163BZptYmCOG71EKBMHupNvDudvGA4U98kXY5K6_YYQe3ZCdB_DWTsnu=w474-h664-no',
    description:
      'Florencia del siglo XVI. El lugar de nacimiento del Renacimiento, donde el arte está prosperando. En un pequeño rincón de esta ciudad, comienza el viaje de Arte, una chica que sueña con convertirse en artista, una carrera imposible para una mujer nacida en una familia noble. En aquellos días, el arte era una profesión exclusivamente masculina, y las mujeres se enfrentaban ante una fuerte discriminación. A pesar de estos desafíos, Arte persevera en alcanzar su sueño con trabajo duro y una actitud positiva.',
    source: 'https://animeflv.net/anime/arte',
    status: 1,
    season: 1,
    premiere: 6,
  },
  {
    name: 'Black Clover (TV)',
    episode: 140,
    date: '2017-10-03',
    station: 3,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3f9H8RX1-m7eOUAPz1HyPLmZuOXaTlf5BqlChWUb82XsHP9soVJx6YxQpnPu3lqcY4HcgvcZ4DnhH90PLFHvbiFrO6CF86w7ZR6Ig9IDzioM7PuTRah5L5gdb9Jm_mMPL_NoTVbd1sLHA287D4SK-pI=w470-h664-no',
    description:
      'La historia de Black Clover nos pone en la piel de un joven llamado Asta, el cual quiere convertirse en el mago más grande del reino. Sin embargo, hay un inconveniente: ¡no puede usar magia! Por suerte, Asta recibe el grimorio trébol de cinco hojas, que le otorga el poder de la anti-magia. ¿Puede alguien carente de magia convertirse en el Rey Hechicero? Una cosa está clara, Asta nunca se rendirá.',
    source: 'https://animeflv.net/anime/black-clover-tv',
    status: 2,
    season: 1,
    premiere: 2,
  },
  {
    name: 'Gleipnir',
    episode: 12,
    date: '2020-04-05',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3eHD2QP2N2R9O-BM-qzzIQQgxUxYIZWzcsFGc8MXqv3SwhqH89g4GdgvgdZzK42tux4fOAbDbaQ5Dv8y0hAia-kx6IhfgQtcGPdY2j5P3MyH0MokTX2OnNqvcCWeBwaj4xGHKbLcI6yN0c0e26txbdH=w533-h664-no',
    description:
      'La historia se centra en Shuichi Kagaya, un estudiante de preparatoria que al intentar rescatar a una hermosa compañera de clases de un incendio, descubre que tiene el poder de transformarse en un kigurumi gigante. Ambos no sólo compartirán el secreto, sino que también cooperarán para que ella logre vengarse de quien asesinó a su familia.',
    source: 'https://animeflv.net/anime/gleipnir',
    status: 1,
    season: 1,
    premiere: 7,
  },
  {
    name: 'Hachi-nan tte, Sore wa Nai deshou!',
    episode: 12,
    date: '2020-04-02',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3fgsc7atFed2o5JgZvik4qHPA13TlyDZVO0UYTghauqcFurg7LPoTlqxYQMJARgMMgk2SP1cUYODJSVQINNY0U_MRS88riFza7LsWgk6CayZsdFQevfn-vGrfE30N4EfrxpWQJ63eGpZFc-7pjIiqfP=w467-h664-no',
    description:
      'Shingo Ichinomiya es un hombre de 25 años que trabaja en una empresa firme, mientras piensa en el ajetreado trabajo que le espera mañana, se va a dormir. Sin embargo, cuando despierta a la mañana siguiente, se da cuenta que está en una habitación desconocida para él y que ha tomado el cuerpo y la mente de un niño de 6 años. Pronto aprende de los recuerdos del niño que nació como el hijo más joven de una familia pobre y noble que vive en un país lejano. Al no tener habilidades administrativas no puede hacer nada para manejar la vasta tierra propiedad de su familia. Afortunadamente, ha sido bendecido con un talento muy raro, el talento de la magia. Desafortunadamente, aunque su talento podría traer prosperidad a su familia, en realidad sólo trajo desastres. Ésta será entonces la historia del niño, Wendelin Von Benno Baumeister, y cómo abrirá su propio camino a través de un duro mundo nuevo.',
    source: 'https://animeflv.net/anime/hachinan-tte-sore-wa-nai-deshou',
    status: 1,
    season: 1,
    premiere: 4,
  },
  {
    name: "Kaguya-sama wa Kokurasetai: Tensai-tachi no Ren'ai Zunōsen",
    episode: 12,
    date: '2019-01-12',
    station: 4,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3fWrUnOlZhMViNnXAR6uYXSaATRMoPMytnmYIdGrMOlu0HPLB_M-hYKPkr0tN15Z1F-sSc8hKvQZdi06Qm8lS6V5WQOqSTDLpBUl8DKwK8NUwNwbHWfz4UD1vWQ5onykZoZmdyFY7TlXxwXjU1xtCFI=w443-h664-no',
    description:
      '¡Todo vale en el amor y en la guerra! Dos genios. Dos cerebros. Dos corazones. Una batalla. ¡¿Quién declarará primero su amor?! Kaguya Shinomiya y Miyuki Shirogane son dos prodigios de gran inteligencia y quienes controlan el consejo de estudiantes de su prestigiosa academia, lo que las convierte en la crème de la crème de la élite. Pero claro, estar en la cima es algo que incluye una buena dosis de soledad como extra, y ambos acaban enamorándose el uno del otro. ¿El problema? Que ambos son demasiado orgullosos como para admitir que están enamorados, así que el primero que lo admita, ¡será el perdedor! Comienza su batalla diaria para intentar forzar al otro a declararse primero.',
    source:
      'https://animeflv.net/anime/kaguyasama-wa-kokurasetai-tensaitachi-no-renai-zunousen',
    status: 3,
    season: 1,
    premiere: 6,
  },
  {
    name: 'Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen',
    episode: 12,
    date: '2020-04-11',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3ePycOVVvMsg7HKR-EA2qd5dznE4OrxWC3If_CEg1EN9MRTstwAR0lT2fH4E5jyOYrOlLNuCYVIbykuNk8PyS_7LobPreJXMdF6yig2S1zwpiajikozuetIYulN8gVLr47tfM94xSUP-O-ORcN1MAJH=w450-h628-no',
    description:
      'Segunda temporada de Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen',
    source:
      'https://animeflv.net/anime/kaguyasama-wa-kokurasetai-tensaitachi-no-renai-zunousen-2nd-season',
    status: 1,
    season: 2,
    premiere: 6,
  },
  {
    name: 'Kakushigoto',
    episode: 12,
    date: '2020-04-02',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3fZf_PUqOdEp-aN0wr9ByaQr4ftFXeLGHXMUHgDCqaKamqJh7x3Iw9QjuitS95yev8Tanp30xtJylAUcvdEo_tyJ66yz8iSh1IU0vMxYxdRybf6c2WFvQ29EabN61M2P5QLAqZiBUWbiA0myYk5x70P=w460-h664-no',
    description:
      'Esta comedia tiene como protagonista a Goto Kakushi, quien no quiere que su hija, Goto Hime, se entere de que es un autor de mangas algo vulgares. Una historia de amor y risas entre padre e hija.',
    source: 'https://animeflv.net/anime/kakushigoto',
    status: 1,
    season: 1,
    premiere: 4,
  },
  {
    name: 'Kami no tou',
    episode: 12,
    date: '2020-04-01',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3eGt0VziscQMKxVMyp-41kirlqqqvZRjLILQ8-TKkkxMGi6RJ76-NLQdOK1vDMqsyhOJ4xOhWbBFu1AJYcnJRRzIcLJewKvIpiSp3WwoTRbsMGWQB481uHLofVlqNN1VW9U1UcPJ28fpSzcqPZxiQAE=w508-h664-no',
    description:
      'La historia presenta a Baam (25º Baam) el cual persiguiendo a su amiga Rachel entra en la Torre, donde solo los elegidos pueden ingresar y aquel que llegue a la cima, puede pedir cualquier deseo. Baam pierde el rastro de su amiga inmediatamente después de entrar en la Torre y luego conoce a nuevos personajes extravagantes los cuales siempre responden a sus preguntas diciendo que la respuesta es siempre la cima de la Torre.',
    source: 'https://www.animeid.tv/kami-no-tou',
    status: 1,
    season: 1,
    premiere: 3,
  },
  {
    name: 'Listeners',
    episode: 12,
    date: '2020-04-03',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3f8PQExJPUX5Py_iJwTcBP-qJ-uHaUkiNUDys79oj9Rdl7ODjjVerz-zhqc5OfceaMVHyTP_g73hpuF6w1vrlnEQX-iduIdpVkIsz6RoBNIimd9cmA52awC7csUiS1U9zLSIYGsiTOAbqnX5jwtrvjn=w960-h664-no',
    description:
      'La “gran sinfonía adolescente” se desarrolla en un mundo donde no existe nada llamado “música”. Un chico se encuentra con Mu, una chica misteriosa con un conector de entrada de audio en su cuerpo. Cuando ella está enchufada a un amplificador, algo que cambiará el mundo se pone en marcha… “Así comienza un viaje de sonido que nunca será olvidado”.',
    source: 'https://animeflv.net/anime/listeners',
    status: 1,
    season: 1,
    premiere: 4,
  },
  {
    name: 'One Piece',
    episode: 1000,
    date: '1999-10-20',
    station: 3,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3eLIb7IFh_fPK_D8Y1O-8q0CaYibYrAqTruaCsKAclTqfHFB4adc8xXQaNWBn-sKaaMkpTMhPCIHoGXAYjKGabPT3TIp6F9uinpcpaYZZvup9cMwrRJ7l7Qkvf9yuBvAoA-p2KhtnVMAv-KY9OacFxc=w288-h512-no',
    description:
      'Una historia épica de piratas, donde narra la historia de Monkey D. Luffy quien cuado tenia 7 años, comió accidentalmente una Akuma no mi(Futa del diablo) la cual le dio poderes de goma. Por otra parte Gol D. Roger conocido como El rey de los Piratas quien fuera ejecutado por la Marine, habló antes de morir, acerca de su famoso tesoro One Piece escondido en la Gran line. Esta noticia desato la gran era de la piratas lanzando a incontables piratas a ese lugar, en busca de One Piece el tesoro perdido. Diez años después, Luffy inspirado en Gol D. Roger y un pirata de nombre Akagami no Shanks (Shanks el pelirrojo) se convierte en pirata deseando ser el próximo Rey de los Piratas y zarpar para conocer amigos y tener aventuras con ellos, teniendo como meta encontrar el One Piece.',
    source: 'https://animeflv.net/anime/one-piece-tv',
    status: 2,
    season: 1,
    premiere: 7,
  },
  {
    name:
      'Otome Game no Hametsu Flag shika Nai Akuyaku Reijou ni Tensei shiteshimatta',
    episode: 12,
    date: '2020-04-04',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3fA4CDevEdyKXLg3zOt_wLuz8mrnTenswflQEIT1xFn8c2bXMMScqLtVQXEJAeKOZOCtP7xakguM4PK4rsoBBdLF5edU8kwU451iO203uHqiPTF1gotO9d7eXE6cFNNlrtUk8VTXN4okIBk3_XOkn74=w468-h665-no',
    description:
      'Katarina Claes, de ocho años, es la única hija de un duque, vive su vida pacíficamente y sin incidentes hasta que se golpea la cabeza contra una roca ... y luego recuerda que en realidad no es la hija del duque. Solía ​​ser una otaku que murió camino a la escuela después de pasar la noche anterior jugando Fortune Lover, su juego de otome favorito. Después de darse cuenta de que su entorno actual parece extrañamente familiar, se sorprende al descubrir que se ha reencarnado en el mundo de Fortune Lover como la villana. La villana en el juego generalmente termina muerta o exiliada, por lo que Katarina decide usar su conocimiento del juego y sus rutas para evitar situaciones malas. Pero, ¿es posible que la villana llegue a un buen final?',
    source:
      'https://animeflv.net/anime/otome-game-no-hametsu-flag-shika-nai-akuyaku-reijou-ni-tensei-shiteshimatta',
    status: 1,
    season: 1,
    premiere: 6,
  },
  {
    name: 'Plunderer',
    episode: 24,
    date: '2020-01-08',
    station: 4,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3c6Gl8QFspHW6S7FzwOY60k_b41k9IXLti7qI4YNDlulumgC_u8Kt1C3c0any15HcyPU6LmTva9jQHJxxQBu5_WgXwFCbQkECtsDcc4qs1oOQqVJnIMKZ0Z1T4uwsdS3tuDJtQ-PlHkkKJdqwuVDgfZ=w843-h664-no',
    description:
      'Es el año 305 en el calendario Alciano, y el mundo está controlado por los números. Cada humano nace con un “Count”, que podría indicar cualquier cosa, desde el número de kilómetros que te suman por caminar o algo tan arbitrario como las veces que otras personas han degustado tu comida. No importa lo que signifique, pero si el “Count” llega a cero… ¡serás mandado al Abyss! Después de que el Count de la madre de Hina llegara a cero, su última petición para Hina fue para que buscara al legendario As.',
    source: 'https://animeflv.net/anime/plunderer',
    status: 1,
    season: 1,
    premiere: 5,
  },
  {
    name: 'Shachou, Battle no Jikan Desu!',
    episode: 12,
    date: '2020-04-05',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3fCS4ayWY1aksm6L1WFXKWGSps-G7eliT2B_sZ6XzOIaN1IqdtS32J1Olid52e8y_rFUO7AnYs2p3ybO7fYR64JRDDBM9jo1ky5rs8s8VGRpekV5yJY7j-Sp-OGZTe7zfDtoH02H_rrmgBraSex_DKo=w1030-h664-no',
    description:
      'Shachou, Battle no Jikan Desu! es un juego isekai de estrategia se desarrolla en un mundo en el que de repente aparecen puertas dimensionales en los cielos, que llevan a incontables mazmorras. La historia presenta al jugador como el presidente de una compañía que contrata aventureros para conquistar mazmorras llenas de monstruos y tesoros. Los jugadores “reclutan” o entrenan a peleadores, magos, caballeros, cazadores, ladrones y otras clases de empleados, para finalmente mandarlos a combatir.',
    source: 'https://animeflv.net/anime/shachou-battle-no-jikan-desu',
    status: 1,
    season: 1,
    premiere: 1,
  },
  {
    name: 'Shironeko Project: Zero Chronicle',
    episode: 12,
    date: '2020-04-06',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3dlAN_pCF6zKI1rWJXAK8sTTI6hb9S7YoqbbsXq6Wf9i4Bxyya9Jco3aSl_xG81Cgk-KDwGePZjpETTZA7luo-cNc8tL1S-fIVTnD0D459nst3hp4IUHWDpreBzfn24Xte48q9syGglf2hj7j3govkZ=w470-h664-no',
    description:
      'En un mundo formado por numerosas islas, un joven héroe de la Isla Astora se encuentra con el aventurero Kyle y lo sigue en una expedición por la isla. En su viaje se encuentran con una chica misteriosa llamada Iris y un gato blanco que habla, y juntos se dirigen a las ruinas de la isla, donde encuentran una isla voladora. Kyle se consume por la oscuridad allí, mientras que el resto del grupo decide viajar a los confines del mundo en la isla voladora para encontrar las siete «Grandes Runas», siguiendo las palabras de Kyle antes de desaparecer.',
    source: 'https://animeflv.net/anime/shironeko-project-zero-chronicle',
    status: 1,
    season: 1,
    premiere: 1,
  },
  {
    name: 'Sword Art Online',
    episode: 25,
    date: '2017-07-07',
    station: 2,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3enpTVY03RnaHcHVMHiUbCb7ZJkn78mFhGCJjGFP13uJ0XCmNNX2lx-m6DFVIVJHralC_ZZM6_gzTrrG0N2dYVyt51DPN1uax_m2lh8WjyYA4heH_hCsG-SwTBsK3FcP4wGfpnVTxzJSBF-xdTICCVr=w1328-h664-no',
    description:
      'Escapar es imposible hasta terminar el juego; un game over significaría una verdadera "muerte". Sin saber la "verdad" de la siguiente generación del Multijugador Masivo Online, Sword Art Online(SAO), con 10 mil usuarios unidos juntos abriendo las cortinas para esta cruel batalla a muerte. Participando solo en SAO, el protagonista Kirito ha aceptado inmediatamente la "verdad" de este MMO. <br/><br/> Y, en el mundo del juego, un gigante castillo flotante llamado Aincrad, Kirito se distinguió a si mismo como un jugador solitario. Apuntando a terminar el juego al alcanzar la planta mas alta el solo continua avanzando arriesgadamente hasta que recibe una invitación a la fuerza de una guerrera y esgrimista experta, Asuna, con la cual tendra que hacer equipo.',
    source: 'https://animeflv.net/anime/sword-art-online',
    status: 3,
    season: 1,
    premiere: 1,
  },
  {
    name: 'Yesterday wo Utatte',
    episode: 18,
    date: '2020-04-04',
    station: 1,
    cover:
      'https://lh3.googleusercontent.com/pw/ACtC-3eBpYvLbVehAdrlCZXeI4kF8DcEbmIbHV1RaFc8MbQ4i4UcEavLLcEl0QMq0_4POvhv7j1TjNpVVJIuSwBMgB54uO85OcyAy8IV0JLv-ewpqjNwddS_N1hZXM9bIgVHV991r-n0N7vnddiz_wacYCGg=w1000-h583-no',
    description:
      'Después de la universidad, Rikuo Uozumi, un niño sin mucha ambición en la vida, toma un trabajo en una tienda de conveniencia. Los días pasan sin incidentes para Rikuo hasta que conoce a su ex novia y compañera de clase, pero especialmente gracias a la inusual Haru Nonaka y su mascota cuervo ...',
    source: 'https://animeflv.net/anime/yesterday-wo-utatte',
    status: 1,
    season: 1,
    premiere: 6,
  },
];

export default animes;
