package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A CarRental.
 */
@Entity
@Table(name = "car_rental")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CarRental implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "car_type")
    private String carType;

    @Column(name = "rental_days")
    private Integer rentalDays;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "price")
    private Float price;

    @Column(name = "pickup_address")
    private String pickupAddress;

    @Column(name = "dropoff_address")
    private String dropoffAddress;

    @Column(name = "color")
    private String color;

    @ManyToOne
    @JsonIgnoreProperties("carRentals")
    private Trip trip;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCarType() {
        return carType;
    }

    public CarRental carType(String carType) {
        this.carType = carType;
        return this;
    }

    public void setCarType(String carType) {
        this.carType = carType;
    }

    public Integer getRentalDays() {
        return rentalDays;
    }

    public CarRental rentalDays(Integer rentalDays) {
        this.rentalDays = rentalDays;
        return this;
    }

    public void setRentalDays(Integer rentalDays) {
        this.rentalDays = rentalDays;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public CarRental startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Float getPrice() {
        return price;
    }

    public CarRental price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getPickupAddress() {
        return pickupAddress;
    }

    public CarRental pickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
        return this;
    }

    public void setPickupAddress(String pickupAddress) {
        this.pickupAddress = pickupAddress;
    }

    public String getDropoffAddress() {
        return dropoffAddress;
    }

    public CarRental dropoffAddress(String dropoffAddress) {
        this.dropoffAddress = dropoffAddress;
        return this;
    }

    public void setDropoffAddress(String dropoffAddress) {
        this.dropoffAddress = dropoffAddress;
    }

    public String getColor() {
        return color;
    }

    public CarRental color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Trip getTrip() {
        return trip;
    }

    public CarRental trip(Trip trip) {
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
        CarRental carRental = (CarRental) o;
        if (carRental.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carRental.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarRental{" +
            "id=" + getId() +
            ", carType='" + getCarType() + "'" +
            ", rentalDays=" + getRentalDays() +
            ", startDate='" + getStartDate() + "'" +
            ", price=" + getPrice() +
            ", pickupAddress='" + getPickupAddress() + "'" +
            ", dropoffAddress='" + getDropoffAddress() + "'" +
            ", color='" + getColor() + "'" +
            "}";
    }
}
