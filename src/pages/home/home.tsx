import { useEffect, useState } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { fetchHomeGoods, fetchHomeBanner } from '@/api/home'

import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import styles from './home.module.scss'
import 'taro-ui/dist/style/components/icon.scss'
import 'taro-ui/dist/style/components/button.scss' // 按需引入
// import 'taro-ui/dist/style/index.scss' // 全量引入
const Home = () => {
  const [bannerList, setBannerList] = useState([])
  const [currIndex, setCurrIndex] = useState(1)
  const [goodsList, setGoodsList] = useState([])
  const [loadingIconShow, setLoadingIconShow] = useState(false)

  useEffect(() => {
    fetchHomeBannerList()
    fetchHomeGoodsList(currIndex)
  }, [])

  const fetchHomeBannerList = async () => {
    try {
      const {
        data: { res }
      } = ((await fetchHomeBanner()) as unknown) as any
      // console.log('fetchHomeBanner => ', res)
      setBannerList(res)
    } catch (error) {
      console.log('fetch home banner error => ', error)
    }
  }
  const fetchHomeGoodsList = async (pageIndex: number) => {
    try {
      const {
        data: { res, page_index: returnPageIndex }
      } = ((await fetchHomeGoods({ page_index: pageIndex })) as unknown) as any
      // console.log('fetchHomeGoods => ', res)
      const glist =
        pageIndex === 1
          ? res
          : pageIndex === returnPageIndex
          ? [...goodsList, ...res]
          : goodsList // 返回的页码要和发出去的页码对得上
      setGoodsList(glist)
      setCurrIndex(res.length ? pageIndex : pageIndex - 1)
    } catch (error) {
      console.log('fetch home goods error => ', error)
    } finally {
      setTimeout(() => {
        Taro.stopPullDownRefresh()
        setLoadingIconShow(false)
      }, 1000)
    }
  }

  const go2GoodDetail = (id: string) => {
    Taro.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }

  // 下拉刷新
  usePullDownRefresh(() => {
    // console.log('usePullDownRefresh')
    setLoadingIconShow(true)
    fetchHomeGoodsList(1)
  })
  // 上拉加载更多
  useReachBottom(() => {
    // console.log('useReachBottom')
    setLoadingIconShow(true)
    fetchHomeGoodsList(currIndex + 1)
  })

  return (
    <View className={styles['home-container']}>
      <View className={styles['home-banner']}>
        <Swiper
          className={styles.swiper}
          autoplay
          circular
          indicator-dots
          indicator-color="rgba(221, 221, 221, .6)"
          indicator-active-color="#ff6347"
        >
          {bannerList.map((item: any) => (
            <SwiperItem key={item._id}>
              <View
                className={styles['banner-item']}
                onClick={() => go2GoodDetail(item._id)}
              >
                <Image src={item.path} />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
      <View className={styles['home-section']}>
        {goodsList.map((item: any) => (
          <View
            className={styles.goods}
            key={item._id}
            onClick={() => go2GoodDetail(item._id)}
          >
            <View className={styles['goods-img']}>
              <Image src={item.icon_url} />
            </View>
            <View className={styles['goods-content']}>
              <View className={styles['goods-desc']}>{item.desc_en}</View>
              <View className={styles['goods-price-area']}>
                <View>
                  <Text className={styles.currency}>￥</Text>
                  <Text className={styles['price-txt']}>{item.price}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      {loadingIconShow ? (
        <View className={styles['loading-mask']}>
          <View className="at-icon at-icon-loading-3" />
        </View>
      ) : null}
    </View>
  )
}

export default Home
