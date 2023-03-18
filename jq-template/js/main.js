;$(() => {
  localStorage.clear()
  createjs.CSSPlugin.install()

  if (!localStorage.getItem('username')) {
    show('.homePage')
    homePageInit()
  } else {
    show('.directory')
    directoryPageInit()
  }

})

const backOut = createjs.Ease.backOut
const linear = createjs.Ease.linear

// 登录页init
function homePageInit() {
  const homePageEl = dq('.homePage')
  const titleEl = dq('.title', homePageEl)
  const subTitleEl = dq('.sub_title', homePageEl)
  const tipEl = dq('.tip', homePageEl)
  const dialogEl = dq('.dialog', homePageEl)
  const nameInputEl = dq('.name_input', homePageEl)
  // const loginBtnEl = dq('.login_btn', homePageEl)
  const loginBtnEl = $('.homePage .login_btn').get(0)

  initAttr([
    {el: titleEl, transform: 'scale(.5, .5)', opacity: '0'},
    {el: subTitleEl, transform: 'scale(.5, .5)', opacity: '0'},
    {el: tipEl, transform: 'scale(.5, .5)', opacity: '0'},
    {el: dialogEl, transform: 'scale(.5, .5)', opacity: '0'},
    {el: nameInputEl, transform: 'scale(.5, .5)', opacity: '0'},
    {el: loginBtnEl, transform: 'scale(.5, .5)', opacity: '0'},
  ])

  createjs.Tween.get(titleEl)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  createjs.Tween.get(subTitleEl)
    .wait(200)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  createjs.Tween.get(tipEl)
    .wait(300)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
    .call(() => {
      createjs.Tween.get(tipEl, {loop: true})
        .to({opacity: ".8", transform: "scale(.85, .85)"}, 1000)
        .to({opacity: "1", transform: "scale(1, 1)"}, 1000)
    })
  createjs.Tween.get(dialogEl)
    .wait(300)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  createjs.Tween.get(nameInputEl)
    .wait(300)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  createjs.Tween.get(loginBtnEl)
    .wait(300)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
    .call(() => {
      $('.login_btn').on('click', function () {
        createjs.Tween.get(loginBtnEl)
        .to({ transform: 'scale(.8)' }, 120, linear)
        .to({ transform: 'scale(1)' }, 120, linear)
        .call(() => {
          const inputVal = $('.name_input input').val()
          if (inputVal == '') {
            toast('请输入用户名')
            createjs.Tween.get(nameInputEl)
              .to({ transform: 'rotate(6deg)' }, 80)
              .to({ transform: 'rotate(-6deg)' }, 160)
              .to({ transform: 'rotate(6deg)' }, 160)
              .to({ transform: 'rotate(-6deg)' }, 160)
              .to({ transform: 'rotate(0deg)' }, 80)
            return
          }
  
          if (inputVal == '张三' || inputVal == '李四' || inputVal == '王五') {
            localStorage.setItem('username', inputVal)
            show('.directory')
            hide('.homePage')
            directoryPageInit()
            return
          }
          toast('您输入的用户名有误')
        })
      })
    })
}

// 目录页init
function directoryPageInit() {
  const scoreBtnEl = dq('.score_btn')
  const memberBtnEl = dq('.member_btn')

  $('.score_btn').on('click', () => {
    initAttr({el: scoreBtnEl, transform: 'scale(1, 1)'})
    createjs.Tween.get(scoreBtnEl)
      .to({ transform: 'scale(.85, .85)' }, 120, linear)
      .to({ transform: 'scale(1, 1)' }, 120, linear)
      .call(() => {
        show('.score')
        hide('.directory')
        scorePageInit()
      })
  })
  $('.member_btn').on('click', () => {
    initAttr({el: memberBtnEl, transform: 'scale(1, 1)'})
    createjs.Tween.get(memberBtnEl)
      .to({ transform: 'scale(.85, .85)' }, 120, linear)
      .to({ transform: 'scale(1, 1)' }, 120, linear)
      .call(() => {
        show('.member')
        hide('.directory')
        memberPageInit()
      })
  })
}

// 打分页init
function scorePageInit() {
  addData(getData())
  const img1El = dq('.score .img1')
  const backBtn = dq('.score .back_btn')
  initAttr([
    {el: backBtn, transform: 'scale(0.5, 0.5)', opacity: '0'},
    {el: img1El, transform: 'scale(0.5, 0.5)', opacity: '0'},
  ])

  createjs.Tween.get(img1El)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  createjs.Tween.get(backBtn)
    .wait(300)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  $('.back_btn').on('click', () => {
    createjs.Tween.get(backBtn)
      .to({ transform: 'scale(.85, .85)' }, 120, linear)
      .to({ transform: 'scale(1, 1)' }, 120, linear)
      .call(() => {
        show('.directory')
        const ulEl = dq('.list')
        ulEl.innerHTML = null
        hide('.score')
      })
  })
}

// 会员页init
function memberPageInit() {
  const ruleEl = dq('.member .rule')
  const backBtn = dq('.member .back_btn')
  initAttr([
    {el: backBtn, transform: 'scale(0.5, 0.5)', opacity: '0'},
    {el: ruleEl, transform: 'scale(0.5, 0.5)', opacity: '0'},
  ])
  createjs.Tween.get(ruleEl)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  createjs.Tween.get(backBtn)
    .wait(300)
    .to({ transform: 'scale(1, 1)', opacity: '1' }, 600, backOut)
  $('.back_btn').on('click', () => {
    createjs.Tween.get(backBtn)
      .to({ transform: 'scale(.85, .85)' }, 120, linear)
      .to({ transform: 'scale(1, 1)' }, 120, linear)
      .call(() => {
        $('.directory').css('display', 'block')
        hide('.member')
      })
  })
}

function getData() {
  if (!localStorage.getItem('dataList')) {
    var dataList = [
      { rank: 1, name: 'a', isVote: 1 },
      { rank: 2, name: 'b', isVote: 1 },
      { rank: 3, name: 'c', isVote: 1 },
      { rank: 4, name: 'd', isVote: 1 },
      { rank: 5, name: 'e', isVote: 1 },
      { rank: 6, name: 'f', isVote: 1 },
      { rank: 7, name: 'g', isVote: 1 },
      { rank: 8, name: 'h', isVote: 1 },
      { rank: 9, name: 'i', isVote: 1 },
      { rank: 10, name: 'j', isVote: 1 },
    ]
    localStorage.setItem('dataList', JSON.stringify(dataList))
  }
  return JSON.parse(localStorage.getItem('dataList'))
}

function addData(data) {
  var $html="";
  data.forEach((item, index) => {
    $html+= `
      <li>
        <span class="rank">${item.rank}</span>
        <div class="headImg">
          <img src="./assets/img/score_img1.png" alt="">
        </div>
        <span class="name">${item.name}</span>
        <div class="vote_btn">
          <img src="./assets/img/score_btn${item.isVote}.png" alt="">
        </div>
      </li>
    `
  })
  $(".list").html($html);
}

// $(".vote_btn img")

function voteHandle() {
  if (item.isVote == 2) {
    toast('您已投票过')
  } else {
    item.isVote = 2
    imgEl_02.src = `./assets/img/score_btn${item.isVote}.png`
    localStorage.setItem('dataList', JSON.stringify(data))
    let voteCount = JSON.parse(localStorage.getItem('voteCount'))
    if (voteCount == 3) {
      toast('每人只能投三票')
      return
    } 

    if (!voteCount) {
      voteCount = 1
    } else {
      voteCount++
    }
    localStorage.setItem('voteCount', JSON.stringify(voteCount))
    toast('投票成功')
  }
}

