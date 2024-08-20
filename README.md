# 프로젝트 소개

poke api를 활용한 포켓몬 도감 사이트

# 프로젝트 기간

8.14 ~ 8.21

# 사용된 기술 & 라이브러리

html
Java script
CSS
jQuery

# 기능

도감 번호순으로 포켓몬을 나열
이름으로 검색 가능
세부페이지로 이동 시 상세정보 확인가능

# 상세정보

메인페이지
https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1025 1025개의 포켓몬 정보를 api 통신으로 가져옴
(https://pokeapi.co/ API 사용)
Promise 동기 처리

메인 페이지에 포켓몬의 이름과 사진을 도감번호 순으로 나열
이름과 사진이 함께있는 영역을 클릭 하면 세부정보가 담겨있는 페이지로 이동

세부페이지로 이동 될때 url에 포켓몬의 이름과 도감번호를 함께 기입함

세부페이지
Promise.all 사용 동기 처리

api를 불러오는 함수를 만들어 Promise.all을 사용해 불러옴
https://pokeapi.co/api/v2/pokemon/${name}
포켓몬
https://pokeapi.co/api/v2/pokemon-species/${id}/`

url에 담긴 포켓몬의 이름과 포켓몬의 도감번호를 쿼리스트링으로 가져와 name과 id라는 상수로 선언
불러온 api에 기입 하여 포켓몬의 상세 정보를 불러와 변수에 복사
