$(document).ready(() => {
  /* api 데이터를 받을 전역변수? */
  //   let poketmon;

  // 전체 게시글을 불러오는 API 호출
  fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025")
    .then((response) => {
      // 성공했을 때 json 데이터를 반환
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        return Promise.reject("404 오류입니다.");
      } else {
        return Promise.reject("데이터를 가져오는데 실패했습니다.");
      }
    })
    .then((json) => {
      // json 데이터 확인
      console.log(json);

      // API 응답에서 포켓몬 리스트를 가져옴
      let poketmon = json.results;
      console.log(poketmon);

      // 각 포켓몬을 순회하면서 요소 생성
      poketmon.forEach((poketmon, index) => {
        makepost(poketmon, index);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  /* 게시물 생성 함수 */
  function makepost(el, index) {
    // div 태그 생성
    const postElement = $("<div></div>");

    // <div></div> 태그의 클릭 이벤트 생성
    postElement.click(function () {
      // window.location.href = `detail.html?id=${index + 1}`;
      window.location.href = `detail.html?name=${el.name}&id=${index + 1}`;
    });
    // article 요소에 이미지 삽입
    $(postElement).append(
      `<article>
        <img id="pokeimg" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png">
         </article>`
    );
    // 자식으로 포켓몬 이름을 가진 strong 요소 삽입
    $(postElement).append(`<strong>no. ${index + 1}</strong>`);
    $(postElement).append(`<strong>${el.name}</strong>`);

    // 생성된 요소를 게시글 그리드에 삽입
    $("#main").append(postElement);
  }

  /* 검색 기능 */
  // $(".search").on("submit", function (e) {
  // // 웹페이지 새로고침방지
  // e.preventDefault();
  // // 검색한 문자 데이터 반환
  // const value = $("#searchPlace").val();
  // // 게시글중 제목에 문자열을 포함한 게시글만 반환
  // $("strong").parent().hide();
  // $(`strong:contains(${value})`).parent().show();
  // });
  $("#searchPlace").keyup("submit", function (e) {
    // 웹페이지 새로고침방지
    e.preventDefault();
    // 검색한 문자 데이터 반환
    const value = $("#searchPlace").val();
    // 게시글중 제목에 문자열을 포함한 게시글만 반환
    $("strong").parent().hide();
    $(`strong:contains(${value})`).parent().show();
  });
});
