// Write your code here
import {Component} from 'react'
// import Loader from 'react-loader-spinner'

import './index.css'

import TeamCard from '../TeamCard'

class Home extends Component {
  state = {ipldata: []}

  componentDidMount() {
    this.getipldata()
  }

  formateddata = data => ({
    id: data.id,
    name: data.name,
    teamImageURL: data.team_image_url,
  })

  getipldata = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)
    const iplteams = data.teams.map(eachit => this.formateddata(eachit))

    this.setState({ipldata: iplteams, isLoading: false})
  }

  renderteamlist = () => {
    const {ipldata} = this.state

    return (
      <ul className="teams-list">
        {/* FIX6: The list of team cards should be rendered using Array.map() method */}
        {ipldata.map(team => (
          <TeamCard teamDetails={team} key={team.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <h1>ipl dashboard</h1>
        {this.renderteamlist()}
      </div>
    )
  }
}

export default Home
