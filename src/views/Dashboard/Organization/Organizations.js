import { useState, useTransition, Suspense, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../../assets/styles/react-tabs.css";
import data from "../../../MCQdata/data";
import { LoadingSpinner } from "../../../components";
import "react-datepicker/dist/react-datepicker.css";
// Importing components for other tabs
import Department from "./Department";
import Designation from "./Designation";
import Location from "./Location";
import Holidays from "./Holidays";
import AllOrganizations from "./AllOrganizations";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiPlusCircle, HiQuestionMarkCircle, HiMail } from "react-icons/hi";
import { FiType } from "react-icons/fi";
import { AiOutlineBook } from "react-icons/ai";
import { FlashcardComponent } from 'react-flashcard'
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom"
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import {
	// Allowance
	allAllowances,
	createAllowance,
	deleteAllowance,
	// Dedution
	allDeductions,
	createDeductions,
	deleteDeduction,
	toastReset,
} from "../../../store/slices/finance/financeSlice";
// Components
import {
	Button,
	Modal,
	SectionHeader,
	InputTag,
	TransitionBtoT,
	RenderIf,
} from "../../../components";
import {
	SubHeading,
	TextareaTag,
	FadedText,
	AllowanceTable,
	WarningModal,
} from "../../../components";
// Importing componts for tabs
import Bank from "../Organization/Bank";
import Expenses from "../Finance/Expenses";
import Cards from "../Finance/Cards";
// import Temp from "./tempCards";
import { SuggestData } from "./SuggestedData"
import Temp from "../Finance/tempCards"
import AlanHooks from "../../../AlanHooks";
import SMS from "./SMS";
var axios = require('axios');
var FormData = require('form-data');

const Organizations = () => {
	console.log(data);
	const All = [
		"HTML",
		"CSS",
		"Javascript",
		"JQUery",
		"React",
		"Vue",
	]
	const Static = [
		"Django",
		"Node",
		"DWF",
	]
	const Dynamic = [
		"pandas",
		"power BI",
		"Numpy",
		"excel",
		"SQL"
	]
	const Blockchain = [
		"Hardhat",
		"NFT",
		"solidity",
		"Smart contracts",
	]
	const Learning = [
		"Questions",
	]

	const [currentTab, setCurrentTab] = useState(0);
	const [isPending, startTransition] = useTransition();

	const tabChangeHandler = (idx) => {
		startTransition(() => {
			setCurrentTab(idx);
		});
	};
	const [file, setFile] = useState();
	const [name, setName] = useState();
	const [couponData, setCoupon] = useState({
		name: "om",
		cart_limit: "2000",
		category: "food",
		amount_limit: "100",
		percent_limit: "20",
		valid_date: "",
		code: "TRY",
		numberOfcoupens: "2",
		lengthofcode: "5",
		is_static: false,
		limit_coupens: "10"
	})
	const [allCoupons, setAllCoupons] = useState([])


	const [showDeductionWarning, setShowDeductionWarning] = useState(false);


	const [startDate, setStartDate] = useState(new Date());
	const [selectedValue, setSelectedValue] = useState("");

	function handleSelectChange(e) {
		setSelectedValue(e.target.value);
	}

	useEffect(() => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/coupons/coupen-get/',
			headers: {
				'Authorization': 'Bearer 2Nzg1NDk0NjUsImp0aSI6ImVhZWY5YzRhOGNiZDRhMDRiNDFjYjI3OGMwMTIwODA3IiwidXNlcl9pZCI6MX0.rRjJVtJjbjeFeTiDOj_ldOQpZqymlcma6YIrCOCFlUI'
			}
		};

		axios(config)
			.then(function (response) {
				console.log(response.data);
				setAllCoupons(response.data);

			})
			.catch(function (error) {
				console.log(error);
			});
	}, [])


	return (
		<div>

			<Tabs
				selectedIndex={currentTab}
				selectedTabClassName="tabs-styles"
				onSelect={tabChangeHandler}>
				<TabList className="tab_list-styles ">
					<Tab className="tab-styles">
						Analysis
					</Tab>
					<Tab className="tab-styles">Feedbacks</Tab>

					{/* <Tab className="tab-styles">Department</Tab>
					<Tab className="tab-styles">Designation</Tab>
					<Tab className="tab-styles">Location</Tab>
					<Tab className="tab-styles">Holidays</Tab> */}
				</TabList>

				<Suspense fallback={<LoadingSpinner />}>
					<TabPanel><div>
						<PowerBIEmbed
							embedConfig={{
								type: 'report',   // Supported types: report, dashboard, tile, visual and qna
								id: 'c325f9de-187d-4a74-8484-5db327831b10',
								accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxLyIsImlhdCI6MTY4ODg2NTM1MiwibmJmIjoxNjg4ODY1MzUyLCJleHAiOjE2ODg4NzA2MjgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUF3bGpUY1gxYmJnbm9NcDNCK2R2WWl0ZWgzM2hXU3c5Zmo4UFM4b2wyT2ZiZ3lrYWo1ZXFhK3IwYm9rdzdtMnFzIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiTUFOR0UiLCJnaXZlbl9uYW1lIjoiQkhVTUlLQSIsImlwYWRkciI6IjE2NS4yMjUuMTA2LjgxIiwibmFtZSI6IkJIVU1JS0EgTUFOR0UgLSA2MDAwNDIwMDA2NSIsIm9pZCI6ImViMGMyYjg5LWYzYTgtNGFjMy04NzhlLTY1NWFhNGY1OTc4MSIsInB1aWQiOiIxMDAzMjAwMTE0NTVGQkFEIiwicmgiOiIwLkFUMEFTRVB4MGJYeENVcXNtWDZfSVR5OGdRa0FBQUFBQUFBQXdBQUFBQUFBQUFBOUFOQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJuNGlERklCb3pkNDJncWt6eHJFUGJZZkdGS28tN0ppSkl5YVp5d1lnbjdVIiwidGlkIjoiZDFmMTQzNDgtZjFiNS00YTA5LWFjOTktN2ViZjIxM2NiYzgxIiwidW5pcXVlX25hbWUiOiJCSFVNSUtBLk1BTkdFNjVAc3ZrbW11bWJhaS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJCSFVNSUtBLk1BTkdFNjVAc3ZrbW11bWJhaS5vbm1pY3Jvc29mdC5jb20iLCJ1dGkiOiJEV19PUWo2eUQwbVM3SXFTS0RJeUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.c5j_3dOzjlKpFtVTx44n2kX4xwJ688zutodl_sJhtZNtfbfFLZfhup9ow1Y1on6lmwh-_WJ_ZJLkKzoqFFH5r9rn4tmXc7gsCoB4qiqmoUq4bQ-kLUXuWQgAItxgDKWtYUw2kf075BSEkxlq-6SUAJXKxkI4iHfhFmx_jpbUanuqTTGeTKZQi32UC796XT1HKTnlQ4GXNoBKeCYXDfy4upYvxVMApVUZA8_bBBwLGe0pIBqhoj4DPOocz4YCwA_VapJGfpo8XB49MXEN9ZpffolVr8v9F2ifbHVPTp6Rz6nkb4wqI8eweV7lJezKP7ORSwpk0HfbNcF7_kdU7HW7fg",
								embedUrl: "https://app.powerbi.com/reportEmbed?reportId=c325f9de-187d-4a74-8484-5db327831b10&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWUsInVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
								tokenType: models.TokenType.Aad,
								settings: {
									panes: {
										filters: {
											expanded: false,
											visible: true
										}
									},
								}
							}}

							eventHandlers={
								new Map([
									['loaded', function () { console.log('Report loaded'); }],
									['rendered', function () { console.log('Report rendered'); }],
									['error', function (event) { console.log(event.detail); }]
								])
							}

							cssClassName={"Embed-container"}

							getEmbeddedComponent={(embeddedReport) => {
								window.report = embeddedReport;
							}}
						/>
					</div></TabPanel>
					<TabPanel>{!isPending && <SMS temp={SuggestData} id="4" type={"Suggested"} />}</TabPanel>
				</Suspense>
			</Tabs>
		</div >
	)
}

export default Organizations;
