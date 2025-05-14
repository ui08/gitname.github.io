import React from "react";
import "./loader.scss";
export default function LoaderFetch() {
    
    return (
        <div className="preLoader_root">
            <div className="preloader_inner">
                <div class="hourglassBackground">
                    <div class="hourglassContainer">
                        <div class="hourglassCurves"></div>
                        <div class="hourglassCapTop"></div>
                        <div class="hourglassGlassTop"></div>
                        <div class="hourglassSand"></div>
                        <div class="hourglassSandStream"></div>
                        <div class="hourglassCapBottom"></div>
                        <div class="hourglassGlass"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
