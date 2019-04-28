import axios from 'axios'

const Token = async token => {
  const res = await axios.get(`https://login.ivao.aero/api.php?type=json&token=${token}`)
  return res.data
}

export default Token
