import { Route, Routes } from "react-router-dom"

import CollectionLocations from "../pages/CollectionLocations"
import BloodTypes from "../pages/BloodTypes"
import Donations from "../pages/Donations"
import Locations from "../pages/Locations"
import Persons from "../pages/Persons"
import Person from "../pages/Person"
import Home from "../pages/Home"

export function Router() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/person" element={<Persons />} />
            <Route path="/donation" element={<Donations />} />
            <Route path="/location" element={<Locations />} />
            <Route path="/blood-type" element={<BloodTypes />} />
            <Route path="/collection-location" element={<CollectionLocations />} />
            <Route path="/person/:id" element={<Person />} />
        </Routes>
    )
}