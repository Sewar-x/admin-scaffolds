import TopMenu from './TopMenu.vue'
import SideMenu from './SideMenu.vue'
import TopAside from './TopAside.vue'
const renderTopMenu = () => {
    return (
        <>
          <TopMenu/>
        </>
      )
}

const renderSideMenu = () => {
    return (
        <>
          <SideMenu/>
        </>
      )
}

export const renderSideMenu = () => {
  return (
      <>
        <TopAside/>
      </>
    )
}