package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Seat.
 */
@Entity
@Table(name = "seat")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Seat implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_number")
    private String number;

    @Column(name = "jhi_row")
    private String row;

    @Column(name = "customer_class")
    private String customerClass;

    @Column(name = "is_reserved")
    private Boolean isReserved;

    @ManyToOne
    @JsonIgnoreProperties("seats")
    private Flight flight;

    @ManyToOne
    @JsonIgnoreProperties("seats")
    private FlightReservation flightReservation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public Seat number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getRow() {
        return row;
    }

    public Seat row(String row) {
        this.row = row;
        return this;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public String getCustomerClass() {
        return customerClass;
    }

    public Seat customerClass(String customerClass) {
        this.customerClass = customerClass;
        return this;
    }

    public void setCustomerClass(String customerClass) {
        this.customerClass = customerClass;
    }

    public Boolean isIsReserved() {
        return isReserved;
    }

    public Seat isReserved(Boolean isReserved) {
        this.isReserved = isReserved;
        return this;
    }

    public void setIsReserved(Boolean isReserved) {
        this.isReserved = isReserved;
    }

    public Flight getFlight() {
        return flight;
    }

    public Seat flight(Flight flight) {
        this.flight = flight;
        return this;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public FlightReservation getFlightReservation() {
        return flightReservation;
    }

    public Seat flightReservation(FlightReservation flightReservation) {
        this.flightReservation = flightReservation;
        return this;
    }

    public void setFlightReservation(FlightReservation flightReservation) {
        this.flightReservation = flightReservation;
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
        Seat seat = (Seat) o;
        if (seat.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), seat.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Seat{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", row='" + getRow() + "'" +
            ", customerClass='" + getCustomerClass() + "'" +
            ", isReserved='" + isIsReserved() + "'" +
            "}";
    }
}
