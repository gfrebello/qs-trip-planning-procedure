package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

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

    @Column(name = "number_of_executive")
    private Integer numberOfExecutive;

    @Column(name = "number_of_economic")
    private Integer numberOfEconomic;

    @Column(name = "total_price")
    private Float totalPrice;

    @OneToMany(mappedBy = "flightReservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Seat> seats = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Flight flight;

    @ManyToOne
    @JsonIgnoreProperties("flightReservations")
    private Trip trip;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumberOfExecutive() {
        return numberOfExecutive;
    }

    public FlightReservation numberOfExecutive(Integer numberOfExecutive) {
        this.numberOfExecutive = numberOfExecutive;
        return this;
    }

    public void setNumberOfExecutive(Integer numberOfExecutive) {
        this.numberOfExecutive = numberOfExecutive;
    }

    public Integer getNumberOfEconomic() {
        return numberOfEconomic;
    }

    public FlightReservation numberOfEconomic(Integer numberOfEconomic) {
        this.numberOfEconomic = numberOfEconomic;
        return this;
    }

    public void setNumberOfEconomic(Integer numberOfEconomic) {
        this.numberOfEconomic = numberOfEconomic;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public FlightReservation totalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public FlightReservation seats(Set<Seat> seats) {
        this.seats = seats;
        return this;
    }

    public FlightReservation addSeat(Seat seat) {
        this.seats.add(seat);
        seat.setFlightReservation(this);
        return this;
    }

    public FlightReservation removeSeat(Seat seat) {
        this.seats.remove(seat);
        seat.setFlightReservation(null);
        return this;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }

    public Flight getFlight() {
        return flight;
    }

    public FlightReservation flight(Flight flight) {
        this.flight = flight;
        return this;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
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
            ", numberOfExecutive=" + getNumberOfExecutive() +
            ", numberOfEconomic=" + getNumberOfEconomic() +
            ", totalPrice=" + getTotalPrice() +
            "}";
    }
}
