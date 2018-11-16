package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
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

    @Column(name = "available")
    private Boolean available;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "price")
    private Float price;

    @ManyToOne
    @JsonIgnoreProperties("hotelRooms")
    private HotelReservation hotelReservation;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Hotel hotel;

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

    public Boolean isAvailable() {
        return available;
    }

    public HotelRoom available(Boolean available) {
        this.available = available;
        return this;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
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

    public HotelReservation getHotelReservation() {
        return hotelReservation;
    }

    public HotelRoom hotelReservation(HotelReservation hotelReservation) {
        this.hotelReservation = hotelReservation;
        return this;
    }

    public void setHotelReservation(HotelReservation hotelReservation) {
        this.hotelReservation = hotelReservation;
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
            ", available='" + isAvailable() + "'" +
            ", roomType='" + getRoomType() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
