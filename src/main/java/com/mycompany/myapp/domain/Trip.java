package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Trip.
 */
@Entity
@Table(name = "trip")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Trip implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number_of_people")
    private Integer numberOfPeople;

    @Column(name = "departure_date")
    private LocalDate departureDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlightReservation> flightReservations = new HashSet<>();

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AttractionReservation> attractionReservations = new HashSet<>();

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Passenger> passengers = new HashSet<>();

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HotelReservation> hotelReservations = new HashSet<>();

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Insurance> insurances = new HashSet<>();

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CarRental> carRentals = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public Trip numberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
        return this;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public Trip departureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
        return this;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public Trip returnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
        return this;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public String getOrigin() {
        return origin;
    }

    public Trip origin(String origin) {
        this.origin = origin;
        return this;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public Trip destination(String destination) {
        this.destination = destination;
        return this;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Set<FlightReservation> getFlightReservations() {
        return flightReservations;
    }

    public Trip flightReservations(Set<FlightReservation> flightReservations) {
        this.flightReservations = flightReservations;
        return this;
    }

    public Trip addFlightReservation(FlightReservation flightReservation) {
        this.flightReservations.add(flightReservation);
        flightReservation.setTrip(this);
        return this;
    }

    public Trip removeFlightReservation(FlightReservation flightReservation) {
        this.flightReservations.remove(flightReservation);
        flightReservation.setTrip(null);
        return this;
    }

    public void setFlightReservations(Set<FlightReservation> flightReservations) {
        this.flightReservations = flightReservations;
    }

    public Set<AttractionReservation> getAttractionReservations() {
        return attractionReservations;
    }

    public Trip attractionReservations(Set<AttractionReservation> attractionReservations) {
        this.attractionReservations = attractionReservations;
        return this;
    }

    public Trip addAttractionReservation(AttractionReservation attractionReservation) {
        this.attractionReservations.add(attractionReservation);
        attractionReservation.setTrip(this);
        return this;
    }

    public Trip removeAttractionReservation(AttractionReservation attractionReservation) {
        this.attractionReservations.remove(attractionReservation);
        attractionReservation.setTrip(null);
        return this;
    }

    public void setAttractionReservations(Set<AttractionReservation> attractionReservations) {
        this.attractionReservations = attractionReservations;
    }

    public Set<Passenger> getPassengers() {
        return passengers;
    }

    public Trip passengers(Set<Passenger> passengers) {
        this.passengers = passengers;
        return this;
    }

    public Trip addPassenger(Passenger passenger) {
        this.passengers.add(passenger);
        passenger.setTrip(this);
        return this;
    }

    public Trip removePassenger(Passenger passenger) {
        this.passengers.remove(passenger);
        passenger.setTrip(null);
        return this;
    }

    public void setPassengers(Set<Passenger> passengers) {
        this.passengers = passengers;
    }

    public Set<HotelReservation> getHotelReservations() {
        return hotelReservations;
    }

    public Trip hotelReservations(Set<HotelReservation> hotelReservations) {
        this.hotelReservations = hotelReservations;
        return this;
    }

    public Trip addHotelReservation(HotelReservation hotelReservation) {
        this.hotelReservations.add(hotelReservation);
        hotelReservation.setTrip(this);
        return this;
    }

    public Trip removeHotelReservation(HotelReservation hotelReservation) {
        this.hotelReservations.remove(hotelReservation);
        hotelReservation.setTrip(null);
        return this;
    }

    public void setHotelReservations(Set<HotelReservation> hotelReservations) {
        this.hotelReservations = hotelReservations;
    }

    public Set<Insurance> getInsurances() {
        return insurances;
    }

    public Trip insurances(Set<Insurance> insurances) {
        this.insurances = insurances;
        return this;
    }

    public Trip addInsurance(Insurance insurance) {
        this.insurances.add(insurance);
        insurance.setTrip(this);
        return this;
    }

    public Trip removeInsurance(Insurance insurance) {
        this.insurances.remove(insurance);
        insurance.setTrip(null);
        return this;
    }

    public void setInsurances(Set<Insurance> insurances) {
        this.insurances = insurances;
    }

    public Set<CarRental> getCarRentals() {
        return carRentals;
    }

    public Trip carRentals(Set<CarRental> carRentals) {
        this.carRentals = carRentals;
        return this;
    }

    public Trip addCarRental(CarRental carRental) {
        this.carRentals.add(carRental);
        carRental.setTrip(this);
        return this;
    }

    public Trip removeCarRental(CarRental carRental) {
        this.carRentals.remove(carRental);
        carRental.setTrip(null);
        return this;
    }

    public void setCarRentals(Set<CarRental> carRentals) {
        this.carRentals = carRentals;
    }

    public User getUser() {
        return user;
    }

    public Trip user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Trip trip = (Trip) o;
        if (trip.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), trip.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Trip{" +
            "id=" + getId() +
            ", numberOfPeople=" + getNumberOfPeople() +
            ", departureDate='" + getDepartureDate() + "'" +
            ", returnDate='" + getReturnDate() + "'" +
            ", origin='" + getOrigin() + "'" +
            ", destination='" + getDestination() + "'" +
            "}";
    }
}
