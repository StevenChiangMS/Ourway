const { useState, useEffect, createContext, useContext } = React;
const DataContext = createContext();

const formData = new FormData();
formData.append("numbers", "20");
    
const Container = () => {
  const [ state, setState ] = useState({
    indexBigImg: [],
    topTen: [],
    categoryHd: [],
    thai: [],
    action: [],
    comedy: [],
    cartoon: [],
    fantasy: [],
    horror: [],
    AdinfoPostOne: [],
    AdinfoPostTwo: [],
    AdinfoPostThree: [],
    AdinfoPostFour: [],
    classApi: [ 
      { name: "ดูหนังออนไลน์ HD", stateName: "categoryHd"},
      { name: "พากย์ไทย", stateName: "thai"},
      { name: "Action บู๊", stateName: "action"},
      { name: "Comedy ตลก", stateName: "comedy"},
      { name: "หนังการ์ตูน", stateName: "cartoon"},
      { name: "Fantasy แฟนตาซี", stateName: "fantasy"},
      { name: "Thriller ระทึกขวัญ", stateName: "horror"},
    ],
    adApi: [ "AdinfoPostOne", "AdinfoPostTwo", "AdinfoPostThree", "AdinfoPostFour" ],
  });

  useEffect(() => {
    //  1. 大圖輪播 API
    fetch("https://www.alfred.wiki/api/carousel/Index/Index/", {
      method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
      setState((prev) => {
        return {...prev, indexBigImg: data.data}
      })
    })
    .catch((err) => console.log("error:", err));

    //  2. 推薦 API
    fetch("https://www.alfred.wiki/api/recomm/", {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      setState((prev) => {
        return {...prev, topTen: data.data}
      })
    })
    .catch((err) => console.log("error:", err));

    //  3. 各類別輪播圖 API
    state.classApi.map((d) => {
      fetch("https://www.alfred.wiki/api/cate/" + d.name + "/", {
        method: "POST",
        body: formData,
      })
      .then((res) => res.json())
      .then((data) => {
        setState((prev) => {
          return {...prev, [d.stateName]: data.data}
        })
      })
      .catch((err) => console.log("error:", err));
    });

    //  4. 廣告 API
    state.adApi.map((d, index) => {
      fetch("https://www.alfred.wiki/api/info/" + (index + 1) + "/", {
        method: "POST",
      })
      .then((res) => res.json())
      .then((data) => {
        setState((prev) => {
          return {...prev, [d]: data.data}
        })
      })
      .catch((err) => console.log("error:", err));
    }); 

  }, []);

  return (
    <DataContext.Provider value={state}>
      <Header />
      <AdOne />
      <Main />
      <Footer />
      <Menu />
    </DataContext.Provider>
  )
};

const Header = () => {
  const data = useContext(DataContext);
  const indexRender = data.indexBigImg.map((data, index) => {
    return (
      index === 0 ? 
      <div key={"index" + index} className="carousel-item active">
        <a href={data.href}>
          <picture>
            <source srcSet={data.desktop_src} media="(min-width: 951px)" />
            <source srcSet={data.mobile_src} media="(max-width: 950px)" />
            <img src={data.desktop_src} className="d-block w-100" />
          </picture>
        </a>
      </div>
      :
      <div key={"index" + index} className="carousel-item">
        <a href={data.href}>
          <picture>
            <source srcSet={data.desktop_src} media="(min-width: 951px)" />
            <source srcSet={data.mobile_src} media="(max-width: 950px)" />
            <img src={data.desktop_src} className="d-block w-100" />
          </picture>
        </a>
      </div>

    )
  });
  return (
    <>
      <header>
        <nav className="headerNav">
          <div className="navLeft">
            <img className="sawadika_500_250" src="./素材/sawadika_500_250.png" alt="sawadika_500_250" />
            <a>หนังฝรั่ง</a>
            <a>หนังไทย</a>
            <a>หนังเกาหลี</a>
            <a>หนังญี่ปุ่น</a>
            <a>หนังจีน</a>
            <img className="sawadika_300_80" src="./素材/sawadika_300_80.png" alt="sawadika_300_80" />
          </div>

          <div className="navRight">
            <img className="search" src="./素材/search.webp" alt="search-g" />
            <input className="navButton" type="button" value="สมัคร" />
          </div>
        </nav>
      </header>

      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {indexRender}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  )
};

const Main = () => {
  return (
    <div id="main" className="main">
      <TopTen />
      <CategoryHd />
      <AdTwo />
      <Thai />
      <Action />
      <AdThree />
      <Comedy />
      <Cartoon />
      <AdFour />
      <Fantasy />
      <Horror />
    </div>
  )
};

const TopTen = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  let data = useContext(DataContext);
  const topTenRender = data.topTen.map((data, index) => {
    return (
      <div className={"topDiv topDiv" + index} key={"topTen" + index}>
          <img className={"topImg num" + index} src={"./素材/number/" + (index + 1) + ".png"} />
        
        <a href={data.href}>
          <img 
            className={"topThailand topThailand" + index }
            alt={data.alt}
            src={data.src}
            title={data.title}
          />
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("topArrowLeft");
    const rightId = document.getElementById("topArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  }

  const arrowRightClick = () => {
    const leftId = document.getElementById("topArrowLeft");
    const rightId = document.getElementById("topArrowRight");
    leftId.hidden = false;
    if (num === 8 && media.matches) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 7 && media.matches && window.innerWidth >= 450) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 6 && media.matches && window.innerWidth >= 550) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 5 && media.matches && window.innerWidth >= 750) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 4 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 4 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 7 && !media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 6 && !media.matches && window.innerWidth >= 1250) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 5 && !media.matches && window.innerWidth >= 1350) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  }

  return (
    <div className="topSlide">
      <h2 className="topTitle">Top 10 in Thailand</h2>
      <div id="topContainer" className="top">
        {/* <div className="topList" style={{"left": (num * -300) + "px"}}>
          {topTenRender}
        </div> */}
        {media.matches ? 
        <div className="categoryContainer" style={{"left": (num * -150) + "px"}}>{topTenRender}</div>
         : 
         <div className="topList" style={{"left": (num * -300) + "px"}}>{topTenRender}</div>
        }
      </div>
      <img hidden={true} id="topArrowLeft" className="arrowLeft" src="./素材/arrow.svg" alt="arrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="topArrowRight" className="arrowRight" src="./素材/arrow.svg" alt="arrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const CategoryHd = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const categoryHdRender = data.categoryHd.map((data, index) => {
    return (
      <div key={"categoryHd" + index}>
        <a href={data.href}>
        <img className="categoryImg" alt={data.alt} src={data.src} title={data.title} />
        <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });
  const arrowLeftClick = () => {
    const leftId = document.getElementById("categoryHdArrowLeft");
    const rightId = document.getElementById("categoryHdArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("categoryHdArrowLeft");
    const rightId = document.getElementById("categoryHdArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>ดูหนังออนไลน์ HD</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="categoryContainer" style={{"left": (num * -100) + "px"}}>{categoryHdRender}</div>
         : 
        <div className="categoryContainer" style={{"left": (num * -236) + "px"}}>{categoryHdRender}</div>
      }
      <img hidden={true} id="categoryHdArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="categoryHdArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const Thai = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const thaiRender = data.thai.map((data, index) => {
    return (
      <div key={"thai" + index}>
        <a href={data.href}>
          <img className="thaiImg" alt={data.alt} src={data.src} title={data.title} />
          <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("thaiArrowLeft");
    const rightId = document.getElementById("thaiArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);

  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("thaiArrowLeft");
    const rightId = document.getElementById("thaiArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>พากย์ไทย</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="thaiContainer" style={{"left": (num * -100) + "px"}}>{thaiRender}</div>
         : 
        <div className="thaiContainer" style={{"left": (num * -236) + "px"}}>{thaiRender}</div>
      }
      <img hidden={true} id="thaiArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="thaiArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const Action = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const actionRender = data.action.map((data, index) => {
    return (
      <div key={"action" + index}>
        <a href={data.href}>
          <img className="actionImg" alt={data.alt} src={data.src} title={data.title} />
          <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("actionArrowLeft");
    const rightId = document.getElementById("actionArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("actionArrowLeft");
    const rightId = document.getElementById("actionArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>Action บย</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="actionContainer" style={{"left": (num * -100) + "px"}}>{actionRender}</div>
         : 
        <div className="actionContainer" style={{"left": (num * -236) + "px"}}>{actionRender}</div>
      }
      <img hidden={true} id="actionArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="actionArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const Comedy = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const comedyRender = data.comedy.map((data, index) => {
    return (
      <div key={"comedy" + index}>
        <a href={data.href}>
          <img className="comedyImg" alt={data.alt} src={data.src} title={data.title} />
          <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("comedyArrowLeft");
    const rightId = document.getElementById("comedyArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("comedyArrowLeft");
    const rightId = document.getElementById("comedyArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>Comedy ตลก</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="comedyContainer" style={{"left": (num * -100) + "px"}}>{comedyRender}</div>
         : 
        <div className="comedyContainer" style={{"left": (num * -236) + "px"}}>{comedyRender}</div>
      }
      <img hidden={true} id="comedyArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="comedyArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const Cartoon = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const cartoonRender = data.cartoon.map((data, index) => {
    return (
      <div key={"cartoon" + index}>
        <a href={data.href}>
          <img className="cartoonImg" alt={data.alt} src={data.src} title={data.title} />
          <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("cartoonArrowLeft");
    const rightId = document.getElementById("cartoonArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("cartoonArrowLeft");
    const rightId = document.getElementById("cartoonArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>หนังการต์ ูน</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="cartoonContainer" style={{"left": (num * -100) + "px"}}>{cartoonRender}</div>
         : 
        <div className="cartoonContainer" style={{"left": (num * -236) + "px"}}>{cartoonRender}</div>
      }
      <img hidden={true} id="cartoonArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="cartoonArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const Fantasy = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const fantasyRender = data.fantasy.map((data, index) => {
    return (
      <div key={"fantasy" + index}>
        <a href={data.href}>
          <img className="fantasyImg" alt={data.alt} src={data.src} title={data.title} />
          <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("fantasyArrowLeft");
    const rightId = document.getElementById("fantasyArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("fantasyArrowLeft");
    const rightId = document.getElementById("fantasyArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>Fantasy แฟนตาซ</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="fantasyContainer" style={{"left": (num * -100) + "px"}}>{fantasyRender}</div>
         : 
        <div className="fantasyContainer" style={{"left": (num * -236) + "px"}}>{fantasyRender}</div>
      }
      <img hidden={true} id="fantasyArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="fantasyArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const Horror = () => {
  const media = window.matchMedia("only screen and (max-width: 950px)");
  const [ num, setNum ] = useState(0);
  const data = useContext(DataContext);
  const horrorRender = data.horror.map((data, index) => {
    return (
      <div key={"horror" + index}>
        <a href={data.href}>
          <img className="horrorImg" alt={data.alt} src={data.src} title={data.title} />
          <div className="titleText">{data.title}</div>
        </a>
      </div>
    )
  });

  const arrowLeftClick = () => {
    const leftId = document.getElementById("horrorArrowLeft");
    const rightId = document.getElementById("horrorArrowRight");

    rightId.hidden = false;
    if (num === 0) {
      return
    }else if (num === 1) {
      setNum(num - 1);
      return leftId.hidden = true;
    }
    leftId.hidden = false;
    setNum(num - 1);
  };

  const arrowRightClick = () => {
    const leftId = document.getElementById("horrorArrowLeft");
    const rightId = document.getElementById("horrorArrowRight");
    leftId.hidden = false;
    if (num === 11 && media.matches && window.innerWidth >= 950) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if (num === 12 && media.matches && window.innerWidth >= 850) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 13 && media.matches && window.innerWidth >= 750) || (num === 13 && !media.matches && window.innerWidth >= 1350)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 14 && media.matches && window.innerWidth >= 650) || (num === 14 && !media.matches && window.innerWidth >= 1250)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 15 && media.matches && window.innerWidth >= 550) || (num === 15 && !media.matches && window.innerWidth >= 1150)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 16 && media.matches && window.innerWidth >= 450) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }else if ((num === 17 && media.matches && window.innerWidth >= 350) || (num === 16 && !media.matches && window.innerWidth >= 951)) {
      setNum(num + 1);
      return rightId.hidden = true;
    }
    rightId.hidden = false;
    setNum(num + 1);
  };

  return (
    <div className="categoryHd">
      <div className="categoryHdTitle">
        <h2>Thriller ระทึกขวัญ</h2>
        <h6>ดูทั้งหมด</h6>
      </div>

      {media.matches ? 
        <div className="horrorContainer" style={{"left": (num * -100) + "px"}}>{horrorRender}</div>
         : 
        <div className="horrorContainer" style={{"left": (num * -236) + "px"}}>{horrorRender}</div>
      }
      <img hidden={true} id="horrorArrowLeft" className="classArrowLeft" src="./素材/arrow.svg" alt="classArrowLeft" onClick={arrowLeftClick} />
      <img hidden={false} id="horrorArrowRight" className="classArrowRight" src="./素材/arrow.svg" alt="classArrowRight" onClick={arrowRightClick} />
    </div>
  )
};

const AdOne = () => {
  const data = useContext(DataContext);
  const AdOneRender = data.AdinfoPostOne.map((data, index) => {

    return (
      <div key={"adOne" + index} className="adOneDiv">
        <a href={data.adLink}>
          <img 
            className="one"
            src={data.adFig.src}
            alt={data.adFig.alt}
            title={data.adFig.title}
          />
         </a>
      </div>
    )
  });

  return (
    <div className="info">
      {AdOneRender}
      <div className="addImg">
        {AdOneRender[0]}
      </div>
      
    </div>
  )
};

const AdTwo = () => {
  const data = useContext(DataContext);
  const AdTwoRender = data.AdinfoPostTwo.map((data, index) => {
    return (
      <div key={"adTwo" + index} className="two">
        <a href={data.adLink}>
          <img 
            src={data.adFig.src}
            alt={data.adFig.alt}
            title={data.adFig.title}
          />
         </a>
      </div>
    )
  });

  return (
    <>
    {AdTwoRender}
    </>
  )
};

const AdThree = () => {
  const data = useContext(DataContext);
  const AdThreeRender = data.AdinfoPostThree.map((data, index) => {
    return (
      <div key={"adThree" + index} className="three">
        <a href={data.adLink}>
          <img 
            src={data.adFig.src}
            alt={data.adFig.alt}
            title={data.adFig.title}
          />
        </a>
      </div>
    )
  });

  return (
    <>
    {AdThreeRender}
    </>
  )
};

const AdFour = () => {
  const data = useContext(DataContext);
  const AdFourRender = data.AdinfoPostFour.map((data, index) => {
    return (
      <div key={"adFour" + index} className="four">
        <a href={data.adLink}>
          <img 
            src={data.adFig.src}
            alt={data.adFig.alt}
            title={data.adFig.title}
          />
        </a>
      </div>
    )
  });

  return (
    <>
    {AdFourRender}
    </>
  )
};

const Footer = () => {
  return (
    <footer>
      <div  className="footerOne">
        <img className="footerImg" src="./footer.jpeg" />
        <div className="footerOneText">
          <div>ขอหนังง่ายๆ ได้ดูใน 3 วัน</div>
          <div>เรื่องไหนก็ดูได้ฟรี พร้อมการแจ้งเตือนผ่านมือถือ</div>
          <input className="footerOneButton" type="button" value="สมัครสมาชิก" />
        </div>
      </div>

      <div  className="footerTwo">
        
          <img className="footerTwoImg sawadika_500_250" src="./素材/sawadika_500_250.png" alt="sawadika_500_250" />
        <div className="footerText">  
          <div>ดูหนังฟรี ไม่มีโฆษณา.</div>
          <div>Copyright 2022All Right Reserved.</div>
        </div>
        <div className="footerTwoButtonDiv">
          <input className="footerTwoButton" type="button" value="ดูหนังออนไลน์ฟรี" />
          <input className="footerTwoButton" type="button" value="ดูหนังฟรีฟรี" />
          <input className="footerTwoButton" type="button" value="ดูซีรี่ย์ฟรี" />
          <input className="footerTwoButton" type="button" value="netflix" />
          <input className="footerTwoButton" type="button" value="ไม่มีโฆษณา" />
          <input className="footerTwoButton" type="button" value="อัปเดตหนัง 2022" />
        </div>

      </div>
    </footer>
  )
};

const Menu = () => {
  return (
    <div className="menuContainer">
      <div>
        <img className="menuIcon" src="./素材/home.png" alt="home"/>
        <div className="menuText">หน้าแรก</div>
      </div>

      <div>
      <img className="menuIcon" src="./素材/category.png" alt="category"/>
      <div className="menuText">หน้าแรก</div>
      </div>

      <div>
      <img className="menuIcon" src="./素材/sawadika_100_100.png" alt="sawadika"/>
      <div className="menuText">หน้าแรก</div>
      </div>

      <div>
      <img className="menuIcon" src="./素材/search.png" alt="search"/>
      <div className="menuText">หน้าแรก</div>
      </div>

      <div>
      <img className="menuIcon" src="./素材/login.png" alt="login"/>
      <div className="menuText">หน้าแรก</div>
      </div>

    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Container />);