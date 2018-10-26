package com.mycompany.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Trip.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Trip.class.getName() + ".tickets", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Trip.class.getName() + ".chosenAttractions", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Ticket.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.CheckPayment.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.CreditCard.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FlightReservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.FlightReservation.class.getName() + ".flights", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Flight.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Flight.class.getName() + ".flightReservations", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.HotelReservation.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.HotelReservation.class.getName() + ".hotels", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Hotel.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Hotel.class.getName() + ".hotelRooms", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.HotelRoom.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.ChosenAttraction.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Attraction.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Insurance.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.CarRental.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
