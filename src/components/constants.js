export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const menuItems = [
  {
    id: 'confirmed',
    label: 'Confirmed',
  },
  {
    id: 'recovered',
    label: 'Recovered',
  },
  {
    id: 'deaths',
    label: 'Deaths',
  },
]

export const menuDefaultId = menuItems[2].id

export const config = {
  type: 'line',
  legend: {
    x: '60px',
    y: '70px',
  },
  series: [],
}

export const scaleX = {
  guide: {
    visible: true,
  },
};
