import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'
import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getteammatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getteammatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)

    const formateddata = {
      teamBannerURL: data.team_banner_url,
      latestMatch: this.getFormattedData(data.latest_match_details),
    }
    // FIX13: The state value of isLoading should be set to false to display the response
    this.setState({teamMatchesData: formateddata})
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
      </div>
    )
  }

  //   renderLoader = () => (
  //     <div data-testid="loader" className="loader-container">
  //       <Loader type="Oval" color="#ffffff" height={50} />
  //     </div>
  //   )

  //   render() {
  //     return <div>{this.renderTeamMatches()}</div>
  //   }

  render() {
    //  const {isloading} = this.state
    return <div>{this.renderTeamMatches()}</div>
  }
}
export default TeamMatch
