package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A FlightReservation.
 */
@Entity
@Table(name = "flight_reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FlightReservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "reservation_id")
    private String reservationId;

    @Column(name = "number_of_people")
    private Integer numberOfPeople;

    @Column(name = "customer_class")
    private String customerClass;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "flight_reservation_flight",
               joinColumns = @JoinColumn(name = "flight_reservations_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "flights_id", referencedColumnName = "id"))
    private Set<Flight> flights = new HashSet<>();

    @OneToOne(mappedBy = "flightReservation")
    @JsonIgnore
    private Trip trip;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReservationId() {
        return reservationId;
    }

    public FlightReservation reservationId(String reservationId) {
        this.reservationId = reservationId;
        return this;
    }

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public FlightReservation numberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
        return this;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public String getCustomerClass() {
        return customerClass;
    }

    public FlightReservation customerClass(String customerClass) {
        this.customerClass = customerClass;
        return this;
    }

    public void setCustomerClass(String customerClass) {
        this.customerClass = customerClass;
    }

    public Set<Flight> getFlights() {
        return flights;
    }

    public FlightReservation flights(Set<Flight> flights) {
        this.flights = flights;
        return this;
    }

    public FlightReservation addFlight(Flight flight) {
        this.flights.add(flight);
        flight.getFlightReservations().add(this);
        return this;
    }

    public FlightReservation removeFlight(Flight flight) {
        this.flights.remove(flight);
        flight.getFlightReservations().remove(this);
        return this;
    }

    public void setFlights(Set<Flight> flights) {
        this.flights = flights;
    }

    public Trip getTrip() {
        return trip;
    }

    public FlightReservation trip(Trip trip) {
        this.trip = trip;
        return this;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
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
        FlightReservation flightReservation = (FlightReservation) o;
        if (flightReservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flightReservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FlightReservation{" +
            "id=" + getId() +
            ", reservationId='" + getReservationId() + "'" +
            ", numberOfPeople=" + getNumberOfPeople() +
            ", customerClass='" + getCustomerClass() + "'" +
            "}";
    }
}
