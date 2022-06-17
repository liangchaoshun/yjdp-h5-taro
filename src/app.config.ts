export default {
  pages: [
    'pages/home/home',
    'pages/category/category',
    'pages/contact/contact',
    'pages/detail/detail',
    'pages/series-list/series-list'
    //"pages/index/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: '#EDF0F2'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/home',
        text: 'home',
        iconPath: './assets/images/tabbar/home.png',
        selectedIconPath: './assets/images/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/category/category',
        text: 'category',
        iconPath: './assets/images/tabbar/category.png',
        selectedIconPath: './assets/images/tabbar/category-active.png'
      },
      {
        pagePath: 'pages/contact/contact',
        text: 'contact',
        iconPath: './assets/images/tabbar/porifile.png',
        selectedIconPath: './assets/images/tabbar/porifile-active.png'
      }
    ],
    color: '#2c2c2c',
    selectedColor: '#d4237a',
    backgroundColor: 'white'
  }
}
