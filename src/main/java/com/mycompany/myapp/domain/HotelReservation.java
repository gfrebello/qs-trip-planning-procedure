package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
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

    @Column(name = "number_of_people")
    private Integer numberOfPeople;

    @Column(name = "checkin_date")
    private LocalDate checkinDate;

    @Column(name = "checkout_date")
    private LocalDate checkoutDate;

    @Column(name = "total_price")
    private Float totalPrice;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "hotel_reservation_hotel_room",
               joinColumns = @JoinColumn(name = "hotel_reservations_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "hotel_rooms_id", referencedColumnName = "id"))
    private Set<HotelRoom> hotelRooms = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("hotelReservations")
    private Trip trip;

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

    public HotelReservation numberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
        return this;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public LocalDate getCheckinDate() {
        return checkinDate;
    }

    public HotelReservation checkinDate(LocalDate checkinDate) {
        this.checkinDate = checkinDate;
        return this;
    }

    public void setCheckinDate(LocalDate checkinDate) {
        this.checkinDate = checkinDate;
    }

    public LocalDate getCheckoutDate() {
        return checkoutDate;
    }

    public HotelReservation checkoutDate(LocalDate checkoutDate) {
        this.checkoutDate = checkoutDate;
        return this;
    }

    public void setCheckoutDate(LocalDate checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public HotelReservation totalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Set<HotelRoom> getHotelRooms() {
        return hotelRooms;
    }

    public HotelReservation hotelRooms(Set<HotelRoom> hotelRooms) {
        this.hotelRooms = hotelRooms;
        return this;
    }

    public HotelReservation addHotelRoom(HotelRoom hotelRoom) {
        this.hotelRooms.add(hotelRoom);
        hotelRoom.getHotelReservations().add(this);
        return this;
    }

    public HotelReservation removeHotelRoom(HotelRoom hotelRoom) {
        this.hotelRooms.remove(hotelRoom);
        hotelRoom.getHotelReservations().remove(this);
        return this;
    }

    public void setHotelRooms(Set<HotelRoom> hotelRooms) {
        this.hotelRooms = hotelRooms;
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
            ", numberOfPeople=" + getNumberOfPeople() +
            ", checkinDate='" + getCheckinDate() + "'" +
            ", checkoutDate='" + getCheckoutDate() + "'" +
            ", totalPrice=" + getTotalPrice() +
            "}";
    }
}
