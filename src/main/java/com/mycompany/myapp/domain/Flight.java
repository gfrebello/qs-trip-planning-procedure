package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Flight.
 */
@Entity
@Table(name = "flight")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Flight implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "company")
    private String company;

    @Column(name = "origin")
    private String origin;

    @Column(name = "destination")
    private String destination;

    @Column(name = "available_seats")
    private Integer availableSeats;

    @Column(name = "departure_date")
    private Instant departureDate;

    @Column(name = "arrival_date")
    private Instant arrivalDate;

    @Column(name = "flight_code")
    private String flightCode;

    @Column(name = "depart_airport")
    private String departAirport;

    @Column(name = "arrival_airport")
    private String arrivalAirport;

    @Column(name = "price")
    private Float price;

    @OneToMany(mappedBy = "flight")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Seat> seats = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompany() {
        return company;
    }

    public Flight company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getOrigin() {
        return origin;
    }

    public Flight origin(String origin) {
        this.origin = origin;
        return this;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDestination() {
        return destination;
    }

    public Flight destination(String destination) {
        this.destination = destination;
        return this;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Integer getAvailableSeats() {
        return availableSeats;
    }

    public Flight availableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
        return this;
    }

    public void setAvailableSeats(Integer availableSeats) {
        this.availableSeats = availableSeats;
    }

    public Instant getDepartureDate() {
        return departureDate;
    }

    public Flight departureDate(Instant departureDate) {
        this.departureDate = departureDate;
        return this;
    }

    public void setDepartureDate(Instant departureDate) {
        this.departureDate = departureDate;
    }

    public Instant getArrivalDate() {
        return arrivalDate;
    }

    public Flight arrivalDate(Instant arrivalDate) {
        this.arrivalDate = arrivalDate;
        return this;
    }

    public void setArrivalDate(Instant arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public String getFlightCode() {
        return flightCode;
    }

    public Flight flightCode(String flightCode) {
        this.flightCode = flightCode;
        return this;
    }

    public void setFlightCode(String flightCode) {
        this.flightCode = flightCode;
    }

    public String getDepartAirport() {
        return departAirport;
    }

    public Flight departAirport(String departAirport) {
        this.departAirport = departAirport;
        return this;
    }

    public void setDepartAirport(String departAirport) {
        this.departAirport = departAirport;
    }

    public String getArrivalAirport() {
        return arrivalAirport;
    }

    public Flight arrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
        return this;
    }

    public void setArrivalAirport(String arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public Float getPrice() {
        return price;
    }

    public Flight price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public Flight seats(Set<Seat> seats) {
        this.seats = seats;
        return this;
    }

    public Flight addSeat(Seat seat) {
        this.seats.add(seat);
        seat.setFlight(this);
        return this;
    }

    public Flight removeSeat(Seat seat) {
        this.seats.remove(seat);
        seat.setFlight(null);
        return this;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
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
        Flight flight = (Flight) o;
        if (flight.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), flight.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Flight{" +
            "id=" + getId() +
            ", company='" + getCompany() + "'" +
            ", origin='" + getOrigin() + "'" +
            ", destination='" + getDestination() + "'" +
            ", availableSeats=" + getAvailableSeats() +
            ", departureDate='" + getDepartureDate() + "'" +
            ", arrivalDate='" + getArrivalDate() + "'" +
            ", flightCode='" + getFlightCode() + "'" +
            ", departAirport='" + getDepartAirport() + "'" +
            ", arrivalAirport='" + getArrivalAirport() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
