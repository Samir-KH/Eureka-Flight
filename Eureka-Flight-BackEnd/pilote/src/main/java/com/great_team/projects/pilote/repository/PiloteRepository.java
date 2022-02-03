package com.great_team.projects.pilote.repository;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.great_team.projects.pilote.entity.Pilote;

@Repository
public interface PiloteRepository extends JpaRepository<Pilote,Long>{
	
	@Query("SELECT p FROM Pilote p WHERE p.nomCompletPilote=?1 and p.adressePilote=?2 and p.dateNaissance=?3 and p.salaire=?4")
	public Optional<Pilote> getPilote(String name, String address, Date birthDay, Float salary);
	

	@Query("SELECT p FROM Pilote p WHERE p.nomCompletPilote=?1 and p.adressePilote=?2 and p.dateNaissance=?3 and p.salaire=?4 and p.numPilote!=?5")
	public ArrayList<Pilote> getOtherPilote(String name, String address, Date birthday, Float salary, Long numPilote);
	
	@Query(value = "SELECT DISTINCT * FROM pilote p LEFT JOIN vol v ON p.num_pilote= v.num_pilote WHERE v.num_pilote IS NULL OR (DATEDIFF(DATE(v.date_vol),NOW())< 0 AND v.num_pilote NOT IN (SELECT v.num_pilote FROM "
			+ "vol v WHERE  DATEDIFF(DATE(v.date_vol),NOW())> 0 ))", nativeQuery=true)
	public ArrayList<Pilote> getAvailabalePilote();

}
