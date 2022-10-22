import React, { useState, forwardRef, useImperativeHandle } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  FormGroup,
  TextField,
  Tooltip,
  IconButton,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Autocomplete,
  createTheme,
  ThemeProvider,
  Input,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PercentIcon from "@mui/icons-material/Percent";
import FOS from "./fos";
import { State } from "country-state-city";
import axios from "axios";
import { CheckBox } from "@mui/icons-material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import state from "country-state-city/lib/state";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

var affor1 = 0;
var affi1 = 0;
var admm1 = 0;

const PreferenceMotivation = (props, ref) => {
  const [collegeType, setCollegeType] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState(null);
  const [regiliousAffliations, setReligiousAffliations] = useState(null);
  const [specializedMission, setSpecializedMission] = useState(null);
  const [location, setLocation] = useState(null);
  const [schoolSize, setSchoolSize] = useState({});
  const [urbanicity, setUrbanicity] = useState({});
  const [reasonsToAttendCollege, setReasonsToAttendCollege] = useState({});
  const [keyConsiderations, setKeyConsiderations] = useState({});
  const [affinityScore, setAffinityScore] = useState(0);
  const [affordabilityScore, setAffordalibityScore] = useState(0);
  const [admissibilityScore, setAdmissibilityScore] = useState(0);
  const [scoreError, setScoreError] = useState(false);
  const [scoreClicked, setScoreClicked] = useState(false);

  useImperativeHandle(ref, () => ({
    postPreference,
  }));

  const postPreference = (event) => {
    var PreferenceMotivation = {
      CollegeType: collegeType,
      FieldOfStudy: fieldOfStudy,
      ReligiousAffliation: regiliousAffliations,
      SpecializedMission: specializedMission,
      Location: location,
      SchoolSize: JSON.stringify(schoolSize),
      Urbanicity: JSON.stringify(urbanicity),
      ReasonsToAttendCollege: JSON.stringify(reasonsToAttendCollege),
      KeyConsiderations: JSON.stringify(keyConsiderations),
      AffinityScore: affinityScore,
      AffordabilityScore: affordabilityScore,
      AdmissibilityScore: admissibilityScore,
    };

    axios
      .post(
        "https://collegeportfoliobackendnode.azurewebsites.net/student/preference",
        PreferenceMotivation
      )
      .then((resp) => console.log(resp));

    console.log(PreferenceMotivation);
  };

  const handleReligiousAffliations = (event) => {
    setReligiousAffliations(event.target.value);
  };

  const handleSpecializedMission = (event) => {
    setSpecializedMission(event.target.value);
  };

  const handleSchoolSize = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setSchoolSize((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const handleUrbanicity = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setUrbanicity((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const handleReasonsToAttendCollege = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setReasonsToAttendCollege((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const handleKeyConsiderations = (event) => {
    var val = event.target.value;
    var checked = event.target.checked;

    setKeyConsiderations((type) => ({
      ...type,
      [val]: checked,
    }));
  };

  const validate = () => {
    var total = affor1 + affi1 + admm1;
    if (total === 100 || total === 99) {
      setScoreError(false);
    } else {
      setScoreError(true);
    }
  };

  const handleCollegeType = (value) => {
    var str = [];
    value.map((ele) => str.push(ele.title));
    setCollegeType(String(str));
  };

  const handleLocation = (value) => {
    var str = [];
    value.map((ele) => str.push(ele.name));
    setLocation(String(str));
  };

  const handleAffinityScore = (event) => {
    var val = parseInt(event.target.value);
    affi1 = val >= 0 ? (val > 100 ? 100 : val) : 0;
    validate();
    setAffinityScore(affi1);
    setScoreClicked(true);
  };

  const handleAdmissibilityScore = (event) => {
    var val = parseInt(event.target.value);
    admm1 = val >= 0 ? (val > 100 ? 100 : val) : 0;
    validate();
    setAdmissibilityScore(admm1);
    setScoreClicked(true);
  };

  const handleAffordabilityScore = (event) => {
    var val = parseInt(event.target.value);
    affor1 = val >= 0 ? (val > 100 ? 100 : val) : 0;
    validate();
    setAffordalibityScore(affor1);
    setScoreClicked(true);
  };

  const collegePreferenceOptions = [
    { title: "Public", value: 1 },
    { title: "Private Non-Profit", value: 2 },
    { title: "Private Profit", value: 3 },
  ];

  const religiousAffliationOptions = [
    { title: "None", value: 0 },
    { title: "African Methodist Episcopal", value: 1 },
    { title: "African Methodist Episcopal Zion Church", value: 2 },
    { title: "American Bapist", value: 3 },
    { title: "American Lutheran", value: 4 },
    { title: "Assemblies of God Church", value: 5 },
  ];

  const specializedMissionsOptions = [
    { title: "None", value: 0 },
    { title: "Women Only", value: 1 },
    { title: "Men Only", value: 2 },
    { title: "Asian American", value: 3 },
    { title: "Alaska Native", value: 4 },
    { title: "Hispanic-Serving", value: 5 },
    { title: "Historically Black College", value: 6 },
  ];

  const schoolSizesOption = [
    { title: "Small", value: 1 },
    { title: "Medium", value: 2 },
    { title: "Large", value: 3 },
  ];

  const urbanicityOption = [
    { title: "City", value: 1 },
    { title: "Suburban", value: 2 },
    { title: "Town", value: 3 },
    { title: "Rural", value: 4 },
  ];

  const reasonsToAttendCollegeOptions = [
    {
      title: "Career prospects",
      value: 1,
      info: "Finding a good job upon graduation measured by income and advancement potential",
    },
    {
      title: "Kinship",
      value: 2,
      info: "Making friends and developing life long bonds",
    },
    {
      title: "Pursue Grad School",
      value: 3,
      info: "Leveraging one's undergraduate degree to pursue graduate school",
    },
  ];

  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: "#db3131",
            "&$error": {
              color: "#db3131",
            },
          },
        },
      },
    },
  });

  React.useEffect(() => {
    if (collegeType == null || fieldOfStudy == null || scoreError) {
      props.handleError(true);
    } else {
      props.handleError(false);
    }

    if (!keyConsiderations[1]) {
      affi1 = 0;
      setAffinityScore(affi1);
      validate();
    } else if (!keyConsiderations[2]) {
      affor1 = 0;
      setAffordalibityScore(affor1);
      validate();
    } else if (!keyConsiderations[3]) {
      admm1 = 0;
      setAdmissibilityScore(admm1);
      validate();
    }
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MDBCard>
          <MDBCardBody className="px-4">
            <MDBRow>
              <MDBCol md="12">
                <Autocomplete
                  multiple
                  id="preferences-and-motivations"
                  options={collegePreferenceOptions}
                  getOptionLabel={(option) => option.title}
                  onChange={(event, value) => {
                    handleCollegeType(value);
                  }}
                  filterSelectedOptions
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} required label="College Type" />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Autocomplete
                  id="field-of-study"
                  options={FOS.Fields}
                  getOptionLabel={(option) => option.FOS}
                  filterSelectedOptions
                  onChange={(event, value) => setFieldOfStudy(value.FOS)}
                  sx={{ mb: 2 }}
                  renderInput={(params) => (
                    <TextField {...params} required label="Field of Study" />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="religious-affiliation-select-label">
                    Religious Affliations
                  </InputLabel>
                  <Select
                    labelId="religious-affiliation-select-label"
                    id="religious-affiliation-select"
                    value={regiliousAffliations}
                    label="Religious Affliations"
                    sx={{ mb: 2 }}
                    onChange={handleReligiousAffliations}
                    fullWidth
                  >
                    {religiousAffliationOptions.map((option) => (
                      <MenuItem value={option.value}>{option.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl fullWidth>
                  <InputLabel id="specialized-mission-select-label">
                    Specialized Mission
                  </InputLabel>
                  <Select
                    labelId="specialized-mission-select-label"
                    id="specialized-mission-select"
                    value={specializedMission}
                    label="Specialized Mission"
                    sx={{ mb: 2 }}
                    onChange={handleSpecializedMission}
                  >
                    {specializedMissionsOptions.map((option) => (
                      <MenuItem value={option.value}>{option.title}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Autocomplete
                  multiple
                  options={state.getStatesOfCountry("US")}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Checkboxes"
                      placeholder="Favorites"
                    />
                  )}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormControl component="fieldset" sx={{ mb: 2, mt: 2 }}>
                  <FormLabel component="legend">School Size</FormLabel>
                  <FormGroup aria-label="position" row>
                    {schoolSizesOption.map((option) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option.value}
                            onChange={handleSchoolSize}
                          />
                        }
                        label={option.title}
                        labelPlacement="end"
                        onChange={handleSchoolSize}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <FormLabel component="legend">Urbanicity</FormLabel>
                <FormGroup aria-label="position" row>
                  {urbanicityOption.map((option) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={option.value}
                          onChange={handleUrbanicity}
                        />
                      }
                      label={option.title}
                      labelPlacement="end"
                      onChange={handleUrbanicity}
                    />
                  ))}
                </FormGroup>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <FormLabel component="legend" required>
                  Your reasons to attend college
                </FormLabel>
                <FormGroup aria-label="position">
                  <br />
                  {reasonsToAttendCollegeOptions.map((option) => (
                    <Grid direction="row">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option.value}
                            onChange={handleReasonsToAttendCollege}
                          />
                        }
                        label={option.title}
                        labelPlacement="end"
                        onChange={handleReasonsToAttendCollege}
                      />
                      <Tooltip
                        style={{ marginLeft: "-20px" }}
                        title={option.info}
                      >
                        <IconButton>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  ))}
                </FormGroup>
              </MDBCol>
              <MDBCol md="6" sx={{ mb: 2 }}>
                <FormLabel component="legend" required>
                  Key selection considerations and importance
                </FormLabel>
                <FormGroup aria-label="position">
                  <Grid direction="row">
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="1"
                          onChange={handleKeyConsiderations}
                        />
                      }
                      label={"Affinity"}
                      labelPlacement="end"
                      onChange={handleKeyConsiderations}
                    />
                    <Tooltip
                      style={{ marginLeft: "-20px" }}
                      title={
                        "Takes into account factors such as college's reputation, ranking, campus safety, transporation access, weather, and perceived cultural fit"
                      }
                    >
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <div style={{ float: "right" }}>
                      <Input
                        error={scoreError & keyConsiderations[1]}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "50px",
                        }}
                        value={affinityScore}
                        onChange={handleAffinityScore}
                        disabled={!keyConsiderations[1]}
                      />
                    </div>
                  </Grid>
                  <Grid direction="row">
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="2"
                          onChange={handleKeyConsiderations}
                        />
                      }
                      label="Affordability"
                      labelPlacement="end"
                      onChange={handleKeyConsiderations}
                    />
                    <Tooltip
                      style={{ marginLeft: "-20px" }}
                      title={"Whether I/we can afford it "}
                    >
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <div style={{ float: "right" }}>
                      <Input
                        error={scoreError & keyConsiderations[2]}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "50px",
                        }}
                        value={affordabilityScore}
                        onChange={handleAffordabilityScore}
                        disabled={!keyConsiderations[2]}
                      />
                    </div>
                  </Grid>
                  <Grid direction="row">
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="3"
                          onChange={handleKeyConsiderations}
                        />
                      }
                      label="Admissibility"
                      labelPlacement="end"
                      onChange={handleKeyConsiderations}
                    />
                    <Tooltip
                      style={{ marginLeft: "-20px" }}
                      title={"Student's chances of getting admitted."}
                    >
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <div style={{ float: "right" }}>
                      <Input
                        error={scoreError & keyConsiderations[3]}
                        endAdornment={
                          <InputAdornment position="end">
                            <PercentIcon style={{ fontSize: "1em" }} />
                          </InputAdornment>
                        }
                        style={{
                          width: "50px",
                        }}
                        value={admissibilityScore}
                        onChange={handleAdmissibilityScore}
                        disabled={!keyConsiderations[3]}
                      />
                    </div>
                  </Grid>
                </FormGroup>
              </MDBCol>
            </MDBRow>

            <Snackbar open={scoreError & scoreClicked} autoHideDuration={6000}>
              <Alert
                severity="error"
                sx={{ width: "100%" }}
              >
                Scores percentage should scale upto 100
              </Alert>
            </Snackbar>
          </MDBCardBody>
        </MDBCard>
      </ThemeProvider>
    </div>
  );
};
export default forwardRef(PreferenceMotivation);
