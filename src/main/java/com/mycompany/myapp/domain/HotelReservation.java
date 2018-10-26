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
 * A HotelReservation.
 */
@Entity
@Table(name = "hotel_reservation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HotelReservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "reservation_id")
    private String reservationId;

    @Column(name = "number_of_people")
    private Integer numberOfPeople;

    @Column(name = "online_payment_choosen")
    private Boolean onlinePaymentChoosen;

    @Column(name = "checkin_date")
    private Instant checkinDate;

    @Column(name = "checkout_date")
    private Instant checkoutDate;

    @Column(name = "price")
    private Float price;

    @OneToMany(mappedBy = "hotelReservation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Hotel> hotels = new HashSet<>();

    @OneToOne(mappedBy = "hotelReservation")
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

    public HotelReservation reservationId(String reservationId) {
        this.reservationId = reservationId;
        return this;
    }

    public void setReservationId(String reservationId) {
        this.reservationId = reservationId;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public HotelReservation numberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
        return this;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public Boolean isOnlinePaymentChoosen() {
        return onlinePaymentChoosen;
    }

    public HotelReservation onlinePaymentChoosen(Boolean onlinePaymentChoosen) {
        this.onlinePaymentChoosen = onlinePaymentChoosen;
        return this;
    }

    public void setOnlinePaymentChoosen(Boolean onlinePaymentChoosen) {
        this.onlinePaymentChoosen = onlinePaymentChoosen;
    }

    public Instant getCheckinDate() {
        return checkinDate;
    }

    public HotelReservation checkinDate(Instant checkinDate) {
        this.checkinDate = checkinDate;
        return this;
    }

    public void setCheckinDate(Instant checkinDate) {
        this.checkinDate = checkinDate;
    }

    public Instant getCheckoutDate() {
        return checkoutDate;
    }

    public HotelReservation checkoutDate(Instant checkoutDate) {
        this.checkoutDate = checkoutDate;
        return this;
    }

    public void setCheckoutDate(Instant checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public Float getPrice() {
        return price;
    }

    public HotelReservation price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Set<Hotel> getHotels() {
        return hotels;
    }

    public HotelReservation hotels(Set<Hotel> hotels) {
        this.hotels = hotels;
        return this;
    }

    public HotelReservation addHotel(Hotel hotel) {
        this.hotels.add(hotel);
        hotel.setHotelReservation(this);
        return this;
    }

    public HotelReservation removeHotel(Hotel hotel) {
        this.hotels.remove(hotel);
        hotel.setHotelReservation(null);
        return this;
    }

    public void setHotels(Set<Hotel> hotels) {
        this.hotels = hotels;
    }

    public Trip getTrip() {
        return trip;
    }

    public HotelReservation trip(Trip trip) {
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
        HotelReservation hotelReservation = (HotelReservation) o;
        if (hotelReservation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelReservation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelReservation{" +
            "id=" + getId() +
            ", reservationId='" + getReservationId() + "'" +
            ", numberOfPeople=" + getNumberOfPeople() +
            ", onlinePaymentChoosen='" + isOnlinePaymentChoosen() + "'" +
            ", checkinDate='" + getCheckinDate() + "'" +
            ", checkoutDate='" + getCheckoutDate() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
