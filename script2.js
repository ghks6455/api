$(document).ready(() => {
  // api를 받아오는 전역변수
  let pokeapi = "";
  // 포켓몬의 정보를 담는 전역변수
  let pokemon = "";
  // 포켓몬의 설명을 담는 전역변수
  let pokedex = "";

  /* 쿼리 스트링 */
  function searchName(key) {
    return new URLSearchParams(location.search).get(key);
  }
  const name = searchName("name");
  console.log(name);
  function searchId(key) {
    return new URLSearchParams(location.search).get(key);
  }
  const id = searchId("id");
  console.log(id);

  /* api 여러개를 호출하기 위해 함수작성  */
  async function apiMain() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("404에러 발생");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function apiSpecies() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}/`
      );
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("404에러 발생");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Promise.all을 사용 api를 불러오기 위해 만든 함수들을 한번에 불러옴
  Promise.all([apiMain(), apiSpecies()]).then((result) => {
    // console.log(result);
    pokeapi = [...result];
    pokemon = result[0];
    pokedex = result[1];
    // console.log(result[1]);
    // console.log(pokemon);

    // 포켓몬의 스텟을 담아둘 상수 선언
    const pokemonStats = pokemon.stats;

    // forEach로 배열울 순회하며 페이지에 출력
    pokemonStats.forEach((stat) => {
      /* 상세 설명 작성 */
      const post = `
      <p>${stat.stat.name}:${stat.base_stat}</p>
      `;
      $("#stats").append(post);
    });

    // 무게와 키를 출력하는 상수
    const lSpec = `
      <p>height</p>
      <p>${pokemon.height}m</p>
      <p>weight</p>
      <p>${pokemon.weight}kg</p>
      `;

    // 특성 타입을 출력하는 상수
    const rSpec = `
       <p>abilities</p>
       <p>${pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
     <p>types</p>
     <p>${pokemon.types.map((a) => a.type.name).join(", ")}</p>`;

    // 포켓몬의 설명을 출력하는 상수
    const hello = pokedex.flavor_text_entries.find(
      (entry) => entry.version.name === "red"
    ).flavor_text;
    // console.log(hello);

    // 선언한 상수들을 태그에 삽입
    $("#hello").append(hello);
    $("#left").append(lSpec);
    $("#right").append(rSpec);

    /* api 안에 있는 공식 이미지를 받아오고 파일 명에 id의 value를 넣어 이미지를 불러옴 */
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    // 이미지를 넣을 태그에 삽입
    $("#image").css({
      "background-image": `url(${image})`,
    });
  });

  /* api를 하나만 불러올때 작성 한 코드 */

  /* api 호출*/
  // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     /* 변수 pokemon에 api 할당 */
  //     pokemon = data;
  //     console.log(pokemon);
  //     //   console.log(pokemon);
  //     let pokemonStats = data.stats;
  //     console.log(pokemonStats);
  /* 스텟 순회 */
  // pokemonStats.forEach((stat) => {
  //   // 스탯 객체 전체를 콘솔에 출력합니다.
  //   // console.log(stat);
  //   // console.log(stat.stat);
  //   /* 상세 설명 작성 */
  //   const post = `
  //   <p>${stat.stat.name}:${stat.base_stat}</p>
  //   `;
  //   $("#stats").append(post);
  // });

  // const lSpec = `
  //   <p>height</p>
  //   <p>${pokemon.height}</p>
  //   <p>weight</p>
  //   <p>${pokemon.weight}</p>

  //   `;
  // const rSpec = `
  //    <p>abilities</p>
  //    <p>${pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
  //  <p>types</p>
  //  <p>${pokemon.types.map((a) => a.type.name).join(", ")}</p>`;

  // $("#left").append(lSpec);
  // $("#right").append(rSpec);

  // /* api 안에 있는 공식 이미지를 받아오고 파일 명에 id의 value를 넣어 이미지를 불러옴 */
  // let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  // $("#image").css({
  //   "background-image": `url(${image})`,
  // });
});
