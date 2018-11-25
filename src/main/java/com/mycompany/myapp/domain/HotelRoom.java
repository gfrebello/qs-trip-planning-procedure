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
 * A HotelRoom.
 */
@Entity
@Table(name = "hotel_room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HotelRoom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "max_capacity")
    private Integer maxCapacity;

    @Column(name = "is_reserved")
    private Boolean isReserved;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "price")
    private Float price;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Hotel hotel;

    @ManyToMany(mappedBy = "hotelRooms")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HotelReservation> hotelReservations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMaxCapacity() {
        return maxCapacity;
    }

    public HotelRoom maxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
        return this;
    }

    public void setMaxCapacity(Integer maxCapacity) {
        this.maxCapacity = maxCapacity;
    }

    public Boolean isIsReserved() {
        return isReserved;
    }

    public HotelRoom isReserved(Boolean isReserved) {
        this.isReserved = isReserved;
        return this;
    }

    public void setIsReserved(Boolean isReserved) {
        this.isReserved = isReserved;
    }

    public String getRoomType() {
        return roomType;
    }

    public HotelRoom roomType(String roomType) {
        this.roomType = roomType;
        return this;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Float getPrice() {
        return price;
    }

    public HotelRoom price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public HotelRoom hotel(Hotel hotel) {
        this.hotel = hotel;
        return this;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Set<HotelReservation> getHotelReservations() {
        return hotelReservations;
    }

    public HotelRoom hotelReservations(Set<HotelReservation> hotelReservations) {
        this.hotelReservations = hotelReservations;
        return this;
    }

    public HotelRoom addHotelReservation(HotelReservation hotelReservation) {
        this.hotelReservations.add(hotelReservation);
        hotelReservation.getHotelRooms().add(this);
        return this;
    }

    public HotelRoom removeHotelReservation(HotelReservation hotelReservation) {
        this.hotelReservations.remove(hotelReservation);
        hotelReservation.getHotelRooms().remove(this);
        return this;
    }

    public void setHotelReservations(Set<HotelReservation> hotelReservations) {
        this.hotelReservations = hotelReservations;
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
        HotelRoom hotelRoom = (HotelRoom) o;
        if (hotelRoom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), hotelRoom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HotelRoom{" +
            "id=" + getId() +
            ", maxCapacity=" + getMaxCapacity() +
            ", isReserved='" + isIsReserved() + "'" +
            ", roomType='" + getRoomType() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
