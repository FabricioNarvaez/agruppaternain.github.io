import { url } from "./url.js";

const swiper_module = document.getElementById("swiper_module");

function addTeamToSwipper(teams, group){
    for(let team of teams){
        let swipperElement = document.createElement("div");
        swipperElement.classList.add("swiper-slide");
        const imgSrc = team.logo || "https://res.cloudinary.com/dzd68sxue/image/upload/v1695396332/WEBP/default-bnoacd-1_qnmcps.webp";
        // TODO: Descomentar los <a>
        const htmlTemplate = `
        <!-- <a title=${team.team} href="team.html?group=${group}&id=${team._id}"> -->
                <img class="swipper_img" src=${imgSrc} title=${team.team}>
                <!--  </a> -->
            <span>${team.team}</span>
        `;
        swipperElement.innerHTML = htmlTemplate;
        swiper_module.appendChild(swipperElement);
    }
}

(async () => {
    const response = await fetch(`${url}api/teams`);
    const { teamsGroupA, teamsGroupB } = await response.json();
    addTeamToSwipper(teamsGroupA, "A");
    addTeamToSwipper(teamsGroupB, "B");

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
          el: '.swiper-pagination',
          clickable: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        breakpoints: {
            500: {
                slidesPerView: 2,
            },
            840: {
                slidesPerView: 4,
            },
            1300: {
                slidesPerView: 5,
            }
        }
    
    });
})();

