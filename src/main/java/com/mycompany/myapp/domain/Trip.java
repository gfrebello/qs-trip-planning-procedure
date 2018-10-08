package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
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
