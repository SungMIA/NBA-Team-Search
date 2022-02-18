import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Form, InputGroup} from "react-bootstrap"
import TeamTable from './TeamTable.jsx'
import { titleCase } from '../helpers/formatting.jsx'

const Home = () => {
    const [search, setSearch] = useState("");
    const [teamInfo, setTeamInfo] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
      const loadTeams = async () => {
        let teams = await axios({
          method: 'get',
          url: 'https://www.balldontlie.io/api/v1/teams'
          })
          setTeamInfo(teams.data.data)
      }
      loadTeams()
    }, [])

    const onChange = e => {
      setSearch(e.target.value)
      searchTeams(e.target.value)
    }

    const searchTeams = (input) => {
      if(input !== "" && teamInfo !== []) {
        let tempArray = []
        let tempSearch = titleCase(input)
        teamInfo.forEach(team => {
          if(titleCase(team.name).includes(tempSearch) || titleCase(team.full_name).includes(tempSearch)){
            tempArray.push(team)
          }
        })
        setResults(tempArray)
      }
    }
    return (
    <div>
        <h3>NBA Teams</h3>
        <Form onChange={onChange} className="mb-3">  
              <Col>
                <InputGroup className="search">
                    <Form.Control size="lg" type="text" placeholder="Enter a NBA team name" className="searchBar">
                    </Form.Control>
                </InputGroup>
              </Col>
            {search === "" && <TeamTable teamInfo={teamInfo}></TeamTable>}
            {search !== "" && <TeamTable teamInfo={results}></TeamTable>}
        </Form>
    </div>
    )}

export default Home