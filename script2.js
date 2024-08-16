$(document).ready(() => {
  // api를 받아오는 전역변수
  let pokeapi = "";

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

  /* api를 받아놓을 변수 */
  let pokemon = "";
  /* api 여러개 호출? */
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

  Promise.all([apiMain(), apiSpecies()]).then((result) => {
    // console.log(result);
    console.log(result);
    pokeapi = [...result];
  });

  console.log(pokeapi);
  /* api 호출*/
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((data) => {
      /* 변수 pokemon에 api 할당 */
      pokemon = data;
      //   console.log(pokemon);
      let pokemonStats = data.stats;
      /* 스텟 순회 */
      pokemonStats.forEach((stat) => {
        // 스탯 객체 전체를 콘솔에 출력합니다.
        // console.log(stat);
        // console.log(stat.stat);
        /* 상세 설명 작성 */
        const post = `
        <p>${stat.stat.name}:${stat.base_stat}</p>
        `;
        $("#stats").append(post);
      });

      const lSpec = `
        <p>height</p>
        <p>${pokemon.height}</p>
        <p>weight</p>
        <p>${pokemon.weight}</p>
    
        `;
      const rSpec = `
         <p>abilities</p>
         <p>${pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
       <p>types</p>
       <p>${pokemon.types.map((a) => a.type.name).join(", ")}</p>`;

      $("#left").append(lSpec);
      $("#right").append(rSpec);

      /* api 안에 있는 공식 이미지를 받아오고 파일 명에 id의 value를 넣어 이미지를 불러옴 */
      let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

      $("#image").css({
        "background-image": `url(${image})`,
      });
    });
});
