import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";
import { useAppContext } from "../../../contexts/AppContext";
import { ExpandIcon } from "../../../assets/img";

// all the country and regiondata is from https://github.com/country-regions/react-country-region-selector
import countryjson from "../../../assets/text/countries.json";
import "./CountryPicker.css";

/* 

  Component:  Country Picker
  Function: - show a dropdown to select a country
            - input characters to filter the dropdown

  TODO: download flags or find a better solution, flacdn is rather slow
 */
export default function CountryPicker({
  className,
  setSelectedCountry,
  style,
  error,
  disabled,
}) {
  const [filteredList, setFilteredList] = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [allRegions, setAllRegions] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [showRegion, setShowRegion] = useState(false);
  const [regionDrop, setRegionDrop] = useState(false);
  const [currentCountry, setCurrentCountry] = useState();

  const inputRef = useRef();
  const regionRef = useRef();

  const app = useAppContext()

  const allCountries = countryjson;
  const needRegion = [];

  function filterList() {
    const filterVal = inputRef.current.value;
    inputRef.current.style.color = "var(--c-gs1)";
    const tempList = [];
    allCountries.forEach((value) => {
      // if (value.countryName.toLowerCase() === filterVal.toLowerCase()) {
      //   countryClicked(value);
      // } else 
      if (
        value.countryName.toLowerCase().includes(filterVal.toLowerCase())
      ) {
        tempList.push(value);
      }
    });
    setFilteredList(tempList);
  }
  function filterRegion() {
    const filterVal = regionRef.current.value;
    regionRef.current.style.color = "black";
    setSelectedCountry("");
    const tempList = [];
    allRegions.forEach((value) => {
      if (value.name.toLowerCase().includes(filterVal.toLowerCase())) {
        tempList.push(value);
      }
    });
    setFilteredRegions(tempList);
  }

  function countryClicked(item, manual="") {
    if (!item) return;
    // console.log(item);
    if (needRegion.includes(item.countryShortCode)) {
      console.log("Region needed for " + item.countryShortCode);
      setSelectedCountry("");
      setCurrentCountry(item.countryShortCode);
      setAllRegions(item.regions);
      setFilteredRegions(item.regions);
      regionRef.current.value = "";
      setShowRegion(true);
    } else {
      setShowRegion(false);
      setCurrentCountry(item)
      setSelectedCountry && setSelectedCountry(item.countryShortCode);
      if(manual === "manual"){
        app.changeLocale(item)
      }
      // console.log(item.countryShortCode);
    }
    inputRef.current.value = item.countryName;
    // inputRef.current.style.color = "#54a8b3";
    inputRef.current.blur();
  }
  function regionClicked(item) {
    // console.log(item);
    regionRef.current.value = item.name;
    regionRef.current.style.color = "var(--c-gs1)";
    regionRef.current.blur();
    setSelectedCountry(currentCountry + "-" + item.shortCode);
  }
  function focusCountry() {
    setShowDrop(true);
    inputRef.current.value = ""
  }

  function blurCountry() {
    setShowDrop(false)
    setValueFromLocale()
    inputRef.current.blur();

  }

  function setValueFromLocale(){
    countryClicked(
      allCountries.find((c) => c.countryShortCode === app.locale?.country_code)
    );
  }

  useEffect(() => {
    setFilteredList(allCountries);
    setValueFromLocale()
  }, []);


  useEffect(() => {
    setValueFromLocale()
  }, [app.locale]);

  const styles = {
    dropdownContainer: {
      position: "relative",
      color: "black",
    },
    regionDropdownContainer: {
      position: "relative",
      display: showRegion ? "block" : "none",
    },
    input: {
      // borderRadius: "10px",
      // border: "solid grey",
      backgroundColor: style?.backgroundColor ? style.backgroundColor : "var(--c-p2)",
      color: "var(--c-txt1)",
    },
    regionInput: {
      borderRadius: "10px",
      // border: "solid grey",
    },
    itemContainer: {
      position: "absolute",
      backgroundColor: "var(--c-p2)",
      color: "var(--c-txt1)",
      display: showDrop ? "block" : "none",
      right: "0",
      left: "0",
      zIndex: "101",
      // margin: "auto",
    },
    regionItemContainer: {
      position: "absolute",
      backgroundColor: "white",
      color: "black",
      display: regionDrop ? "block" : "none",
      right: "0",
      left: "0",
      // margin: "auto",
    },
    itemContainerInner: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      overflowY: "scroll",
      height: "200px",
    },
    item: {
      // backgroundColor: "red"
      cursor: "pointer",
      //   fontSize: "14px"
    },
    error: {
      color: "red",
      fontSize: "14px",
    },
  };
  return (
    // dropdown / input field for filtering
    // listContainer with Items: flagImage and Name

    <>
      <div style={styles.dropdownContainer} className={`${className}`}>
        <Form.Control
          // className="w-75 p-2 my-1"
          style={styles.input}
          placeholder="Country"
          // autoComplete="country"
          id="cw-countrypicker"
          ref={inputRef}
          onFocus={focusCountry}
          onInput={() => filterList()}
          onBlur={blurCountry}
        />
        <div
          className="ps-3 position-absolute end-0 top-0 bottom-0 d-flex justify-content-center align-items-center"
          onClick={() => inputRef.current.focus()}
        >
          <ExpandIcon height={32} fill="var(--c-txt1)" />
        </div>
        <div className="rounded py-2 w-100" style={styles.itemContainer}>
          <div className=" px-1" style={styles.itemContainerInner}>
            {filteredList.length > 0 ? (
              filteredList.map((item, index) => {
                return (
                  <div
                    className="py-2 rounded countrypicker-item text-start ps-4"
                    style={styles.item}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => countryClicked(item, "manual")}
                    key={index}
                  >
                    <Image
                      src={`https://flagcdn.com/20x15/${item.countryShortCode.toLowerCase()}.png`}
                      className="pe-3"
                    />
                    <span>{item.countryName}</span>
                  </div>
                );
              })
            ) : (
              <span className="text-center">No Item found</span>
            )}
          </div>
        </div>
      </div>
      <div style={styles.regionDropdownContainer} className={`${className}`}>
        <input
          className="w-75 p-2 my-1"
          style={styles.regionInput}
          placeholder="State"
          ref={regionRef}
          onFocus={() => {
            setRegionDrop(true);
          }}
          onInput={() => filterRegion()}
          onBlur={() => setRegionDrop(false)}
          disabled={disabled}
        />
        <div className="rounded py-2 w-75" style={styles.regionItemContainer}>
          <div className=" px-1" style={styles.itemContainerInner}>
            {filteredRegions.map((item, index) => {
              return (
                <div
                  className="py-2 rounded countrypicker-item text-start ps-3"
                  style={styles.item}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => regionClicked(item)}
                  key={index}
                >
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {error && (
        <span className="" style={styles.error}>
          {error}
        </span>
      )}
    </>

    // <input list="countrylist" placeholder="Country" ref={countryRef}/>
    //   <datalist id="countrylist">
    //     {countryjson.map((item) => {
    //       return <div value={item.countryName} ><Image src={`https://flagcdn.com/16x12/${item.countryShortCode.toLowerCase()}.png`} /><span>{item.countryName}</span></div>
    //     })}
    //   </datalist>
  );
}

// try out importing all images in a folder
// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => {
//     images[item.replace("./", "")] = r(item);
//   });

//   return images;
// }
