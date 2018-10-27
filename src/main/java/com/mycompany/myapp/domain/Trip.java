package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
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

    @Column(name = "trip_id")
    private String tripId;

    @Column(name = "payment_done")
    private Boolean paymentDone;

    @Column(name = "number_of_people")
    private Integer numberOfPeople;

    @Column(name = "departure_date")
    private Instant departureDate;

    @Column(name = "return_date")
    private Instant returnDate;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @OneToOne
    @JoinColumn(unique = true)
    private HotelReservation hotelReservation;

    @OneToOne
    @JoinColumn(unique = true)
    private Insurance insurance;

    @OneToOne
    @JoinColumn(unique = true)
    private CarRental carRental;

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FlightReservation> flightReservations = new HashSet<>();

    @OneToMany(mappedBy = "trip")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AttractionReservation> attractionReservations = new HashSet<>();

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

    public String getTripId() {
        return tripId;
    }

    public Trip tripId(String tripId) {
        this.tripId = tripId;
        return this;
    }

    public void setTripId(String tripId) {
        this.tripId = tripId;
    }

    public Boolean isPaymentDone() {
        return paymentDone;
    }

    public Trip paymentDone(Boolean paymentDone) {
        this.paymentDone = paymentDone;
        return this;
    }

    public void setPaymentDone(Boolean paymentDone) {
        this.paymentDone = paymentDone;
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

    public Instant getDepartureDate() {
        return departureDate;
    }

    public Trip departureDate(Instant departureDate) {
        this.departureDate = departureDate;
        return this;
    }

    public void setDepartureDate(Instant departureDate) {
        this.departureDate = departureDate;
    }

    public Instant getReturnDate() {
        return returnDate;
    }

    public Trip returnDate(Instant returnDate) {
        this.returnDate = returnDate;
        return this;
    }

    public void setReturnDate(Instant returnDate) {
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

    public HotelReservation getHotelReservation() {
        return hotelReservation;
    }

    public Trip hotelReservation(HotelReservation hotelReservation) {
        this.hotelReservation = hotelReservation;
        return this;
    }

    public void setHotelReservation(HotelReservation hotelReservation) {
        this.hotelReservation = hotelReservation;
    }

    public Insurance getInsurance() {
        return insurance;
    }

    public Trip insurance(Insurance insurance) {
        this.insurance = insurance;
        return this;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }

    public CarRental getCarRental() {
        return carRental;
    }

    public Trip carRental(CarRental carRental) {
        this.carRental = carRental;
        return this;
    }

    public void setCarRental(CarRental carRental) {
        this.carRental = carRental;
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
            ", tripId='" + getTripId() + "'" +
            ", paymentDone='" + isPaymentDone() + "'" +
            ", numberOfPeople=" + getNumberOfPeople() +
            ", departureDate='" + getDepartureDate() + "'" +
            ", returnDate='" + getReturnDate() + "'" +
            ", origin='" + getOrigin() + "'" +
            ", destination='" + getDestination() + "'" +
            "}";
    }
}
