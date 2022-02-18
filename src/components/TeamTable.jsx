import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { randomNumber } from '../helpers/formatting';



function TeamTable({teamInfo}) {
    const [show, setShow] = useState(false)
    const [rowIndex, setRowIndex] = useState()
    const [cardInfo, setCardInfo] = useState([])

    const totalGames = async (teamId, name, fullName) => {
        let games = await axios({
            method: 'get',
            url: 'https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]='+teamId
        })
        let total = games.data.meta.total_count
        let random = games.data.data[randomNumber(1, 25)]
        let date = random.date.substring(0, 10)
        let hName = random.home_team.name
        let hScore = random.home_team_score
        let vName = random.visitor_team.name
        let vScore = random.visitor_team_score

        let card = [name, fullName, total, date, hName, hScore, vName, vScore]
        console.log(random)
        setCardInfo(card)
        handleShow()
    }

    const handleShow = () => setShow(true)
    const handleClose = () => {
        setShow(false)
        clearHighlights()
    }
    const clearHighlights = () => {
        const rows = document.getElementsByTagName('tr')
        console.log(rows)
        rows[rowIndex+1].style.backgroundColor = 'transparent'
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            const rows = document.getElementsByTagName('tr')
            rows[rowIndex+1].style.backgroundColor = "rgb(216, 247, 122)"
            totalGames(row.id, row.name, row.full_name)
            setRowIndex(rowIndex)
        }
    }

    const headers = [
        {
            dataField: "name",
            text: "Team Name",
            sort: true
        },
        {
            dataField: "city",
            text: "City",
            sort: true
        },
        {
            dataField: "abbreviation",
            text: "Abbreviation",
            sort: true
        },
        {
            dataField: "conference",
            text: "Conference",
            sort: true
        },
        {
            dataField: "division",
            text: "Division",
            sort: true
        }
    ]

    return (
        <>
        <BootstrapTable
            bootstrap4
            keyField="id"
            data={teamInfo}
            columns={headers}
            rowEvents= {rowEvents}
            pagination={paginationFactory({ sizePerPage: 7 })}/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{cardInfo[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Team Full Name: {cardInfo[1]}
            </Modal.Body>
            <Modal.Body>
                Total Games in 2021: {cardInfo[2]}
            </Modal.Body>
            <Modal.Body id="bold_body">
                Random Game Details
            </Modal.Body>
            <Modal.Body>
                Date: {cardInfo[3]}
            </Modal.Body>
            <Modal.Body>
                Home Team:  {cardInfo[4]}
            </Modal.Body>
            <Modal.Body>
                Home Team Score: {cardInfo[5]}
            </Modal.Body>
            <Modal.Body>
                Visitor Team: {cardInfo[6]}
            </Modal.Body>
            <Modal.Body>
                Visitor Team Score: {cardInfo[7]}
            </Modal.Body>
        </Modal>
        </>
        )
      }

export default TeamTable