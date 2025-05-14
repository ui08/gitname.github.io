import React from "react";
import nodataImage from '../../assets/img/noData.png';
import './NoDataFound.scss'

const NoDataFound = () => {
    return (
        <React.Fragment>
            <div className="noData_found_wrapper">
                <div className="noData_image_wrapper">
                    <img src={nodataImage} className="noData_img img-fluid"></img>
                    <div className="noData_content">
                        <h6 className="noData_heading">No data available at the moment!</h6>
                        <p className="noData_des"><i>It seems like there’s nothing to display right now.Please check back later.</i></p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NoDataFound;